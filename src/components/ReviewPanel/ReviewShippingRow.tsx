import { formatPrice } from "../../utils/calculations";

interface ReviewShippingRowProps {
  icon: string;
  label: string;
  compareAtPrice: number;
}

export default function ReviewShippingRow({
  icon,
  label,
  compareAtPrice,
}: ReviewShippingRowProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        <img src={icon} alt="" aria-hidden="true" className="object-contain" />
        <span className="text-[14px] font-semibold text-[var(--color-text-heading)] tracking-[0.005em]">
          {label}
        </span>
      </div>
      <div className="text-right flex flex-col leading-tight">
        <span className="text-price-strike">{formatPrice(compareAtPrice)}</span>
        <span className="text-[12px] font-bold tracking-[0.6px] text-[var(--color-primary)]">
          FREE
        </span>
      </div>
    </div>
  );
}
