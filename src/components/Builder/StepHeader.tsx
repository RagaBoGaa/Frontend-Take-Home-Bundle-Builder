import type { Step } from "../../types";
import StepTitle from "./StepTitle";
import StepIndicator from "./StepIndicator";

interface StepHeaderProps {
  step: Step;
  isActive: boolean;
  selectedCount: number;
  onClick: () => void;
  contentId: string;
}

export default function StepHeader({
  step,
  isActive,
  selectedCount,
  onClick,
  contentId,
}: StepHeaderProps) {
  return (
    <button
      onClick={onClick}
      aria-expanded={isActive}
      aria-controls={contentId}
      className="
        group w-full text-left cursor-pointer flex flex-col gap-[5px]
        focus:outline-none
        focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]
        focus-visible:ring-offset-2 rounded-sm
      "
    >
      <span className={`label-overline px-[15px] ${isActive ? "text-[12px]" : "text-[10px]"}`}>
        Step {step.stepNumber} of 4
      </span>

      <div
        className={`
          w-full flex items-center justify-between px-[15px] py-[20px]
          transition-colors duration-200
          ${!isActive
            ? "border-y-[0.5px] border-[#1F1F1F] group-hover:bg-gray-50"
            : "border-t-[0.5px] border-[#1F1F1F]"
          }
        `}
      >
        <StepTitle title={step.title} icon={step.icon} />
        <StepIndicator isActive={isActive} selectedCount={selectedCount} />
      </div>
    </button>
  );
}
