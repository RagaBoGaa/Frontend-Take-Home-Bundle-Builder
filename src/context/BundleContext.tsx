import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type {
  BundleState,
  BundleAction,
  Step,
  ReviewLineItemData,
} from "../types";
import { bundleData, initialState } from "../data/products";
import { loadState } from "../hooks/usePersistedState";
import {
  getSelectionKey,
  selectedCountForStep,
  buildReviewLineItems,
  calculateTotals,
} from "../utils/calculations";

function enforceBusinessRules(state: BundleState): BundleState {
  const sensorProducts = bundleData.steps
    .flatMap((s) => s.products)
    .filter((p) => p.reviewCategory === "Sensors" && p.id !== "wyze-sense-hub");

  let totalSensors = 0;
  for (const product of sensorProducts) {
    if (product.variants && product.variants.length > 0) {
      for (const variant of product.variants) {
        totalSensors += state.selections[`${product.id}::${variant.id}`] ?? 0;
      }
    } else {
      totalSensors += state.selections[product.id] ?? 0;
    }
  }

  const currentHubQty = state.selections["wyze-sense-hub"] ?? 0;
  const newHubQty = totalSensors > 0 ? 1 : 0;

  if (currentHubQty !== newHubQty) {
    return {
      ...state,
      selections: {
        ...state.selections,
        "wyze-sense-hub": newHubQty,
      },
    };
  }

  return state;
}

function bundleReducer(state: BundleState, action: BundleAction): BundleState {
  let newState = state;
  switch (action.type) {
    case "SET_STEP":
      newState = { ...state, activeStep: action.payload };
      break;

    case "SET_QUANTITY":
      newState = {
        ...state,
        selections: {
          ...state.selections,
          [action.payload.key]: Math.max(0, action.payload.quantity),
        },
      };
      break;

    case "INCREMENT":
      newState = {
        ...state,
        selections: {
          ...state.selections,
          [action.payload.key]: (state.selections[action.payload.key] ?? 0) + 1,
        },
      };
      break;

    case "DECREMENT":
      newState = {
        ...state,
        selections: {
          ...state.selections,
          [action.payload.key]: Math.max(
            0,
            (state.selections[action.payload.key] ?? 0) - 1,
          ),
        },
      };
      break;

    case "SELECT_VARIANT":
      newState = {
        ...state,
        activeVariants: {
          ...state.activeVariants,
          [action.payload.productId]: action.payload.variantId,
        },
      };
      break;

    case "RESTORE_STATE":
      newState = { ...action.payload };
      break;

    default:
      return state;
  }
  return enforceBusinessRules(newState);
}

interface BundleContextType {
  state: BundleState;
  dispatch: React.Dispatch<BundleAction>;
  data: typeof bundleData;
  getQuantity: (productId: string, variantId?: string) => number;
  getSelectedCount: (step: Step) => number;
  getReviewLineItems: () => ReviewLineItemData[];
  getTotals: () => {
    subtotal: number;
    compareAtTotal: number;
    savings: number;
  };
}

const BundleContext = createContext<BundleContextType | null>(null);

export function BundleProvider({ children }: { children: ReactNode }) {
  const savedState = loadState();
  const [state, dispatch] = useReducer(
    bundleReducer,
    savedState ?? initialState,
  );

  useEffect(() => {
    if (savedState) {
      dispatch({ type: "RESTORE_STATE", payload: savedState });
    }
  }, []);

  const getQuantity = useCallback(
    (productId: string, variantId?: string): number => {
      const key = getSelectionKey(productId, variantId);
      return state.selections[key] ?? 0;
    },
    [state.selections],
  );

  const getSelectedCount = useCallback(
    (step: Step): number => {
      return selectedCountForStep(step, state.selections);
    },
    [state.selections],
  );

  const getReviewLineItems = useCallback((): ReviewLineItemData[] => {
    return buildReviewLineItems(bundleData.steps, state.selections);
  }, [state.selections]);

  const getTotals = useCallback(() => {
    const lineItems = buildReviewLineItems(bundleData.steps, state.selections);
    return calculateTotals(lineItems);
  }, [state.selections]);

  return (
    <BundleContext.Provider
      value={{
        state,
        dispatch,
        data: bundleData,
        getQuantity,
        getSelectedCount,
        getReviewLineItems,
        getTotals,
      }}
    >
      {children}
    </BundleContext.Provider>
  );
}

export function useBundle(): BundleContextType {
  const context = useContext(BundleContext);
  if (!context) {
    throw new Error("useBundle must be used within a BundleProvider");
  }
  return context;
}
