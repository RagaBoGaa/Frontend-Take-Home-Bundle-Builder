interface NextButtonProps {
  label: string;
  onClick: () => void;
}

export default function NextButton({ label, onClick }: NextButtonProps) {
  return (
    <div className="flex justify-center pb-[20px]">
      <button
        onClick={onClick}
        type="button"
        className="
          h-[39px] rounded-[7px] px-6 py-[5px]
          border border-[var(--color-primary)]
          text-[var(--color-primary)] font-semibold text-lg
          transition-all duration-200 cursor-pointer
          hover:bg-[var(--color-primary)] hover:text-white hover:shadow-md
          hover:shadow-[var(--color-primary)]/25
          focus:outline-none
          focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]
          focus-visible:ring-offset-2
        "
      >
        Next: {label}
      </button>
    </div>
  );
}
