import type { Product } from "../../types";
import { useBundle } from "../../context/BundleContext";
import { getSelectionKey } from "../../utils/calculations";
import QuantityStepper from "./QuantityStepper";
import VariantSelector from "./VariantSelector";
import ProductBadge from "./ProductBadge";
import ProductImage from "./ProductImage";
import ProductPrice from "./ProductPrice";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { state, dispatch, getQuantity } = useBundle();

  const hasVariants = product.variants && product.variants.length > 0;
  const activeVariantId = hasVariants
    ? (state.activeVariants[product.id] ?? product.variants![0].id)
    : undefined;

  const currentQty = getQuantity(product.id, activeVariantId);
  const selectionKey = getSelectionKey(product.id, activeVariantId);

  const isSelected = hasVariants
    ? product.variants!.some(
        (v) => (state.selections[getSelectionKey(product.id, v.id)] ?? 0) > 0,
      )
    : currentQty > 0;

  const handleVariantSelect = (variantId: string) => {
    dispatch({
      type: "SELECT_VARIANT",
      payload: { productId: product.id, variantId },
    });
  };

  const handleIncrement = () => {
    dispatch({ type: "INCREMENT", payload: { key: selectionKey } });
  };

  const handleDecrement = () => {
    dispatch({ type: "DECREMENT", payload: { key: selectionKey } });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
    }
  };

  return (
    <div
      role="article"
      aria-label={product.name}
      tabIndex={currentQty === 0 && !product.isRequired ? 0 : -1}
      onKeyDown={handleKeyDown}
      className={`
        group relative w-full min-h-full rounded-[10px] p-[11px]
        bg-white flex flex-row gap-[13px]
        transition-all duration-200 ease-in-out
        border-2 focus-visible:outline-none
        ${isSelected ? "border-[var(--color-primary)]" : "border-transparent"}
      `}
    >
      <div className="relative flex flex-col items-center justify-start w-[100px] flex-shrink-0">
        {product.badge && <ProductBadge badge={product.badge} />}
        <ProductImage image={product.image} name={product.name} />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <h3
          className={`text-[16px] font-semibold tracking-[0.6px] text-[var(--color-text-main)] mb-1 ${
            product.id === "cam-unlimited" ? "invisible select-none" : ""
          }`}
        >
          {product.name}
          {product.isRequired && (
            <span className="font-normal text-[13px] text-[var(--color-text-muted)]">
              {" "}
              (Required)
            </span>
          )}
        </h3>

        <p className="text-[12px] font-medium leading-[130%] tracking-[0.6px] text-[var(--color-text-main)] mb-2.5">
          {product.description}{" "}
          <a
            href={product.learnMoreUrl}
            onClick={(e) => e.stopPropagation()}
            className="
              text-[var(--color-primary)] underline decoration-solid
              focus-visible:outline-none focus-visible:ring-1
              focus-visible:ring-[var(--color-primary)] rounded-sm
            "
          >
            Learn More
          </a>
        </p>

        {hasVariants && (
          <div className="mb-4">
            <VariantSelector
              variants={product.variants!}
              activeVariantId={activeVariantId!}
              onSelect={handleVariantSelect}
            />
          </div>
        )}

        <div className="mt-auto flex items-end justify-between">
          <QuantityStepper
            value={currentQty}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            disabled={product.isRequired}
          />
          <ProductPrice
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            priceFormat={product.priceFormat}
          />
        </div>
      </div>
    </div>
  );
}
