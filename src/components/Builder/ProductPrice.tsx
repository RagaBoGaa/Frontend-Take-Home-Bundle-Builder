import { formatPrice } from "../../utils/calculations";

interface ProductPriceProps {
  price: number;
  compareAtPrice?: number;
  priceFormat?: "one-time" | "monthly";
}

export default function ProductPrice({
  price,
  compareAtPrice,
  priceFormat,
}: ProductPriceProps) {
  return (
    <div className="text-right flex flex-col leading-tight">
      {compareAtPrice && (
        <span className="text-[16px] font-normal tracking-[0.6px] text-[var(--color-price-original)] line-through">
          {formatPrice(compareAtPrice)}
        </span>
      )}
      <span className="text-[16px] font-normal tracking-[0.6px] text-[var(--color-text-light)]">
        {priceFormat === "monthly"
          ? `${formatPrice(price)}/mo`
          : formatPrice(price)}
      </span>
    </div>
  );
}
