import type { ReviewLineItemData } from "../../types";

interface ReviewLineItemDetailsProps {
  item: ReviewLineItemData;
}

export default function ReviewLineItemDetails({
  item,
}: ReviewLineItemDetailsProps) {
  if (item.productId === "cam-unlimited") {
    return (
      <div className="flex-1 min-w-0 flex items-center h-[41px]">
        <img
          src={item.image}
          alt={item.name}
          className="h-[24px] w-auto object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://placehold.co/100x24/f5f5f5/999?text=${encodeURIComponent(item.name)}`;
          }}
        />
      </div>
    );
  }

  return (
    <>
      <div className="size-[41px] rounded-[5px] bg-white flex items-center justify-center flex-shrink-0 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="max-w-full max-h-full object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://placehold.co/40x40/f5f5f5/999?text=${encodeURIComponent(item.name.charAt(0))}`;
          }}
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-semibold text-[var(--color-text-heading)] whitespace-pre-wrap tracking-[0.005em]">
          {item.name}
          {item.isRequired && (
            <span className="font-normal text-[var(--color-text-muted)]">
              {" "}
              (Required)
            </span>
          )}
          {item.variantLabel && (
            <span className="text-[10px] font-normal text-[var(--color-text-muted)]">
              {" "}
              ({item.variantLabel})
            </span>
          )}
        </p>
      </div>
    </>
  );
}
