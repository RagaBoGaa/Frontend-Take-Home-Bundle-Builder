import type { Badge } from "../../types";

interface ProductBadgeProps {
  badge: Badge;
}

export default function ProductBadge({ badge }: ProductBadgeProps) {
  return (
    <span
      role="status"
      aria-label={badge.text}
      className="
        absolute top-0 left-0 z-10
        min-w-[65px] rounded-[10px] px-[6px] py-[4px]
        bg-[var(--color-primary)]
        inline-flex items-center justify-center
        text-[11px] font-semibold leading-none text-white text-center
      "
    >
      {badge.text}
    </span>
  );
}
