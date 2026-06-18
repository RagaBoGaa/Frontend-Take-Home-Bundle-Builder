import { formatPrice } from "../../utils/calculations";

interface ReviewSavingsCalloutProps {
  savings: number;
}

export default function ReviewSavingsCallout({
  savings,
}: ReviewSavingsCalloutProps) {
  if (savings <= 0) return null;

  return (
    <p
      role="status"
      aria-live="polite"
      className="
        animate-fade-in-up
        text-center text-[12px] font-semibold
        text-[var(--color-teal)] mb-1
        tracking-[-0.0006em] leading-[100%]
      "
    >
      Congrats! You're saving {formatPrice(savings)} on your security bundle!
    </p>
  );
}
