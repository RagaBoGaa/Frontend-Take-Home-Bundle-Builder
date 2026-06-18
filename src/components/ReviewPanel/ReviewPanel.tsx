import { useBundle } from "../../context/BundleContext";
import { bundleData } from "../../data/products";
import type { ReviewCategory } from "../../types";
import ReviewHeader from "./ReviewHeader";
import ReviewSection from "./ReviewSection";
import ReviewSummary from "./ReviewSummary";
import CheckoutButton from "./CheckoutButton";

const CATEGORY_ORDER: ReviewCategory[] = [
  "Cameras",
  "Sensors",
  "Accessories",
  "Plan",
];

function getCategoryForItem(productId: string): ReviewCategory | undefined {
  for (const step of bundleData.steps) {
    for (const product of step.products) {
      if (product.id === productId) {
        return product.reviewCategory;
      }
    }
  }
  return undefined;
}

export default function ReviewPanel() {
  const { getReviewLineItems } = useBundle();
  const lineItems = getReviewLineItems();

  const groupedItems = CATEGORY_ORDER.map((category) => ({
    category,
    items: lineItems.filter(
      (item) => getCategoryForItem(item.productId) === category,
    ),
  }));

  return (
    <aside
      role="complementary"
      aria-label="Order summary"
      className="bg-[var(--color-background-blue)] rounded-[10px] pt-5 pb-[31px] px-[15px]"
    >
      <ReviewHeader />

      {groupedItems.map(({ category, items }) => (
        <ReviewSection key={category} title={category} items={items} />
      ))}

      <ReviewSummary />
      <CheckoutButton />
    </aside>
  );
}
