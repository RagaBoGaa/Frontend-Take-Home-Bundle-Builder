import type { Variant } from "../../types";

interface VariantSelectorProps {
  variants: Variant[];
  activeVariantId: string;
  onSelect: (variantId: string) => void;
}

export default function VariantSelector({
  variants,
  activeVariantId,
  onSelect,
}: VariantSelectorProps) {
  return (
    <div
      role="group"
      aria-label="Select variant"
      className="flex gap-[6px] flex-wrap"
    >
      {variants.map((variant) => {
        const isActive = variant.id === activeVariantId;
        return (
          <button
            key={variant.id}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(variant.id);
            }}
            aria-label={`Select ${variant.label} variant`}
            aria-pressed={isActive}
            className={`
              flex items-center gap-1.5 px-2 rounded-[2px] border
              transition-all duration-200 cursor-pointer
              focus:outline-none
              focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]
              focus-visible:ring-offset-1
              ${isActive
                ? "border-[var(--color-teal)] bg-[var(--color-background-blue)]"
                : "border-[#CCCCCC] bg-white hover:border-[#C0CBD5]"
              }
            `}
          >
            <img
              src={variant.swatch}
              alt={`${variant.label} swatch`}
              className="w-[28px] h-[28px] rounded-[2px] inline-block flex-shrink-0 object-cover"
            />
            <span className="text-[10px] font-medium tracking-[0.6px] text-[var(--color-text-main)]">
              {variant.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
