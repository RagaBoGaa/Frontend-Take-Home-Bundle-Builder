import type { Step, ReviewLineItemData } from '../types';


export function getSelectionKey(productId: string, variantId?: string): string {
  return variantId ? `${productId}::${variantId}` : productId;
}


export function selectedCountForStep(
  step: Step,
  selections: Record<string, number>
): number {
  let count = 0;
  for (const product of step.products) {
    if (product.variants && product.variants.length > 0) {
      const hasAny = product.variants.some(
        (v) => (selections[getSelectionKey(product.id, v.id)] ?? 0) > 0
      );
      if (hasAny) count++;
    } else {
      if ((selections[getSelectionKey(product.id)] ?? 0) > 0) count++;
    }
  }
  return count;
}


export function buildReviewLineItems(
  steps: Step[],
  selections: Record<string, number>
): ReviewLineItemData[] {
  const items: ReviewLineItemData[] = [];

  for (const step of steps) {
    for (const product of step.products) {
      if (product.variants && product.variants.length > 0) {
        for (const variant of product.variants) {
          const key = getSelectionKey(product.id, variant.id);
          const qty = selections[key] ?? 0;
          if (qty > 0) {
            items.push({
              productId: product.id,
              variantId: variant.id,
              selectionKey: key,
              name: product.name,
              variantLabel: variant.label,
              image: variant.swatch,
              quantity: qty,
              compareAtPrice: product.compareAtPrice
                ? product.compareAtPrice * qty
                : undefined,
              price: product.price * qty,
              isFree: product.isFree,
              isRequired: product.isRequired,
              priceFormat: product.priceFormat ?? 'one-time',
            });
          }
        }
      } else {
        const key = getSelectionKey(product.id);
        const qty = selections[key] ?? 0;
        if (qty > 0) {
          items.push({
            productId: product.id,
            selectionKey: key,
            name: product.name,
            image: product.image,
            quantity: qty,
            compareAtPrice: product.compareAtPrice
              ? product.compareAtPrice * qty
              : undefined,
            price: product.isFree ? 0 : product.price * qty,
            isFree: product.isFree,
            isRequired: product.isRequired,
            priceFormat: product.priceFormat ?? 'one-time',
          });
        }
      }
    }
  }

  return items;
}


export function calculateTotals(lineItems: ReviewLineItemData[]): {
  subtotal: number;
  compareAtTotal: number;
  savings: number;
} {
  let subtotal = 0;
  let compareAtTotal = 0;

  for (const item of lineItems) {
    subtotal += item.price;
    compareAtTotal += item.compareAtPrice ?? item.price;
  }

  return {
    subtotal,
    compareAtTotal,
    savings: compareAtTotal - subtotal,
  };
}


export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}
