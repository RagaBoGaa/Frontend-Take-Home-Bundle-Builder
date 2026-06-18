import { formatPrice } from "../../utils/calculations";

interface ReviewTotalSectionProps {
  financingText: string;
  subtotal: number;
  compareAtTotal: number;
}

export default function ReviewTotalSection({
  financingText,
  subtotal,
  compareAtTotal,
}: ReviewTotalSectionProps) {
  return (
    <div className="flex items-end justify-between mt-6 mb-4">
      <div className="flex-shrink-0">
        <img
          src="/icons/satisguaran.webp"
          alt="Satisfaction guarantee"
          className="w-[90px] h-auto"
        />
      </div>

      <div className="flex flex-col items-end">
        <div className="mb-2">
          <span className="
            inline-block text-[12px] font-medium text-white
            bg-[var(--color-primary)] rounded-[3px]
            px-[8px] py-[5px] tracking-[-0.005em]
          ">
            {financingText}
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          {compareAtTotal > subtotal && (
            <span className="text-[18px] font-medium tracking-[0.5px] text-[var(--color-text-subtle)] line-through leading-[20px]">
              {formatPrice(compareAtTotal)}
            </span>
          )}
          <span className="text-[24px] font-bold text-[var(--color-primary)] leading-[130%] tracking-[-0.0013em]">
            {formatPrice(subtotal)}
          </span>
        </div>
      </div>
    </div>
  );
}
