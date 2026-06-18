import type { Step } from "../../types";
import { useBundle } from "../../context/BundleContext";
import StepHeader from "./StepHeader";
import ProductGrid from "./ProductGrid";
import NextButton from "./NextButton";

interface AccordionStepProps {
  step: Step;
  isActive: boolean;
  onToggle: () => void;
  onNext: () => void;
}

export default function AccordionStep({
  step,
  isActive,
  onToggle,
  onNext,
}: AccordionStepProps) {
  const { getSelectedCount } = useBundle();
  const selectedCount = getSelectedCount(step);
  const contentId = `step-content-${step.id}`;

  return (
    <div
      className={`
        transition-all duration-300 overflow-hidden
        ${isActive
          ? "bg-[var(--color-background-blue)] pt-[15px] rounded-[10px] mb-[13px]"
          : "bg-white pt-[5px] lg:pt-[13px]"
        }
      `}
    >
      <StepHeader
        step={step}
        isActive={isActive}
        selectedCount={selectedCount}
        onClick={onToggle}
        contentId={contentId}
      />

      <div
        id={contentId}
        role="region"
        aria-label={`${step.title} products`}
        className={`
          overflow-hidden transition-all duration-500
          ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isActive ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <ProductGrid products={step.products} />
        {step.nextLabel && (
          <NextButton label={step.nextLabel} onClick={onNext} />
        )}
      </div>
    </div>
  );
}
