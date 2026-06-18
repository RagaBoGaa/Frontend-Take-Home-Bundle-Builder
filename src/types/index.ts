// ── Variant ──
export interface Variant {
  id: string;
  label: string;
  // color: string;
  swatch: string; 
}

// ── Badge ──
export interface Badge {
  text: string; 
  type: 'discount';
}

// ── Product ──
export interface Product {
  id: string;
  name: string;
  description: string;
  learnMoreUrl: string;
  image: string;
  badge?: Badge;
  compareAtPrice?: number;
  price: number;
  reviewCategory: ReviewCategory;
  variants?: Variant[];
  isFree?: boolean;
  isRequired?: boolean;
  priceFormat?: 'one-time' | 'monthly';
}

// ── Step ──
export interface Step {
  id: string;
  stepNumber: number;
  title: string;
  icon: string;
  nextLabel: string | null; 
  products: Product[];
}

// ── Review Categories ──
export type ReviewCategory = 'Cameras' | 'Sensors' | 'Accessories' | 'Plan';

// ── State ──
export interface BundleState {
  activeStep: number;
  selections: Record<string, number>;
  activeVariants: Record<string, string>; 
}

// ── Reducer Actions ──
export type BundleAction =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_QUANTITY'; payload: { key: string; quantity: number } }
  | { type: 'INCREMENT'; payload: { key: string } }
  | { type: 'DECREMENT'; payload: { key: string } }
  | { type: 'SELECT_VARIANT'; payload: { productId: string; variantId: string } }
  | { type: 'RESTORE_STATE'; payload: BundleState };

// ── Review Panel Data ──
export interface ReviewLineItemData {
  productId: string;
  variantId?: string;
  selectionKey: string;
  name: string;
  variantLabel?: string;
  image: string;
  quantity: number;
  compareAtPrice?: number;
  price: number;
  isFree?: boolean;
  isRequired?: boolean;
  priceFormat?: 'one-time' | 'monthly';
}

// ── Config ──
export interface ShippingConfig {
  label: string;
  compareAtPrice: number;
  price: number;
  icon: string;
}

export interface FinancingConfig {
  text: string;
}

export interface BundleData {
  steps: Step[];
  shipping: ShippingConfig;
  financing: FinancingConfig;
}
