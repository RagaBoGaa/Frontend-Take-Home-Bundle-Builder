import { formatPrice } from "../../utils/calculations";

interface ReviewLineItemPriceProps {
  price: number;
  quantity: number;
  compareAtPrice?: number;
  isMonthly: boolean;
  isFree?: boolean;
}

interface PriceDisplayProps {
  strikethrough?: string;
  value: string;
  valueClassName?: string;
}

function PriceDisplay({
  strikethrough,
  value,
  valueClassName,
}: PriceDisplayProps) {
  return (
    <div className="flex flex-col leading-tight text-right">
      {strikethrough && (
        <span className="text-price-strike">{strikethrough}</span>
      )}
      <span className={valueClassName ?? "text-price"}>{value}</span>
    </div>
  );
}

export default function ReviewLineItemPrice({
  price,
  quantity,
  compareAtPrice,
  isMonthly,
  isFree,
}: ReviewLineItemPriceProps) {
  const wrapper = "flex-shrink-0 min-w-[60px]";

  if (isMonthly) {
    return (
      <div className={wrapper}>
        <PriceDisplay
          strikethrough={
            compareAtPrice
              ? `${formatPrice(compareAtPrice / quantity)}/mo`
              : undefined
          }
          value={`${formatPrice(price / quantity)}/mo`}
        />
      </div>
    );
  }

  if (isFree) {
    return (
      <div className={wrapper}>
        <PriceDisplay
          strikethrough={
            compareAtPrice ? formatPrice(compareAtPrice) : undefined
          }
          value="FREE"
          valueClassName="text-[12px] font-bold tracking-[0.6px] text-[var(--color-primary)]"
        />
      </div>
    );
  }

  return (
    <div className={wrapper}>
      <PriceDisplay
        strikethrough={
          compareAtPrice && compareAtPrice !== price
            ? formatPrice(compareAtPrice)
            : undefined
        }
        value={formatPrice(price)}
      />
    </div>
  );
}
