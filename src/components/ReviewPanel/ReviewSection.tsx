import type { ReviewLineItemData } from "../../types";
import ReviewLineItem from "./ReviewLineItem";

interface ReviewSectionProps {
  title: string;
  items: ReviewLineItemData[];
}

export default function ReviewSection({ title, items }: ReviewSectionProps) {
  if (items.length === 0) return null;

  return (
    <div className="mb-[10px] border-t border-[var(--color-border-light)]">
      <h3 className="section-title mb-2 pt-[15px]">
        {title}
      </h3>
      <ul role="list" className="space-y-3">
        {items.map((item) => (
          <ReviewLineItem key={item.selectionKey} item={item} />
        ))}
      </ul>
    </div>
  );
}
