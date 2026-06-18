import React from "react";
import { Icon } from "../ui/Icon";

interface StepperButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "increment" | "decrement";
}

export function StepperButton({
  variant,
  disabled,
  className = "",
  type = "button",
  "aria-label": ariaLabel,
  ...props
}: StepperButtonProps) {
  const label = ariaLabel ?? (variant === "increment" ? "Increase quantity" : "Decrease quantity");

  return (
    <button
      type={type}
      disabled={disabled}
      aria-label={label}
      className={`
        flex items-center justify-center w-[20px] h-[20px] rounded-[4px]
        transition-all duration-200 text-[var(--color-text-main)]
        focus:outline-none
        focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]
        focus-visible:ring-offset-1
        ${disabled
          ? "border-2 border-[var(--color-border-subtle)] bg-white opacity-50 cursor-not-allowed"
          : "bg-[#F0F4F7] hover:bg-[var(--color-border-subtle)] cursor-pointer border-transparent"
        }
        ${className}
      `.trim()}
      {...props}
    >
      {variant === "increment" ? (
        <Icon name="plusIcon" size={8} />
      ) : (
        <Icon name="minusIcon" size={8} />
      )}
    </button>
  );
}
