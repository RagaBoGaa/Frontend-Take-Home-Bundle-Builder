import { Icon } from "../ui/Icon";

interface StepIndicatorProps {
  isActive: boolean;
  selectedCount: number;
}

export default function StepIndicator({
  isActive,
  selectedCount,
}: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-2 text-sm flex-shrink-0">
      {isActive && selectedCount > 0 && (
        <span className="text-[14px] leading-[16px] font-medium text-[var(--color-primary)] animate-fade-in-up">
          {selectedCount} selected
        </span>
      )}
      <span
        className={`
          transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          text-[var(--color-primary)]
          group-hover:translate-y-[1px]
          ${isActive ? "rotate-180" : "rotate-0"}
        `}
      >
        <Icon name="arrowIcon" size={12} />
      </span>
    </div>
  );
}
