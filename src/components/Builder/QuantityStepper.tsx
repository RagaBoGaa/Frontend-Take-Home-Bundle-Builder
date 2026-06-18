import { StepperButton } from "./StepperButton";

interface QuantityStepperProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  compact?: boolean;
  disabled?: boolean;
}

export default function QuantityStepper({
  value,
  onIncrement,
  onDecrement,
  min = 0,
  compact = false,
  disabled = false,
}: QuantityStepperProps) {
  const isAtMin = value <= min;

  return (
    <div
      className={`flex items-center ${
        compact ? "gap-2 py-0.5" : "gap-2.5 py-1"
      } ${disabled ? "opacity-50 pointer-events-none" : ""}`}
    >
      <StepperButton
        variant="decrement"
        onClick={onDecrement}
        disabled={disabled || isAtMin}
        aria-label="Decrease quantity"
        className={compact ? "!bg-white hover:!bg-white !border-none" : ""}
      />

      <span
        className={`font-semibold text-center tabular-nums min-w-1.5 ${
          compact ? "text-[14px]" : "text-[16px]"
        } text-[#0B0D10]`}
      >
        {value}
      </span>

      <StepperButton
        variant="increment"
        onClick={onIncrement}
        disabled={disabled}
        aria-label="Increase quantity"
        className={compact ? "!bg-white hover:!bg-white !border-none" : ""}
      />
    </div>
  );
}
