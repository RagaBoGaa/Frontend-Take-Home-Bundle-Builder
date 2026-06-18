import { useState } from "react";
import { useBundle } from "../../context/BundleContext";
import { saveState } from "../../hooks/usePersistedState";

export default function CheckoutButton() {
  const { state } = useBundle();
  const [saved, setSaved] = useState(false);

  const handleCheckout = () => {
    alert("Checkout clicked! This is a prototype — no actual checkout.");
  };

  const handleSave = () => {
    saveState(state);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <button
        id="checkout-button"
        type="button"
        onClick={handleCheckout}
        className="
          btn-shimmer
          w-full py-[13px] px-4 rounded-[4px]
          font-bold text-white text-sm
          bg-[var(--color-primary)]
          transition-all duration-200 cursor-pointer
          relative overflow-hidden
          hover:bg-[var(--color-primary-hover)]
          hover:shadow-lg hover:shadow-[var(--color-primary)]/30
          hover:-translate-y-px
          active:translate-y-0 active:shadow-md
          focus:outline-none
          focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]
          focus-visible:ring-offset-2
        "
      >
        Checkout
      </button>

      <div className="text-center mt-2" aria-live="polite" aria-atomic="true">
        <button
          id="save-system-button"
          type="button"
          onClick={handleSave}
          className="
            text-sm text-[var(--color-text-muted)] underline italic
            hover:text-[var(--color-primary)]
            transition-colors duration-200 cursor-pointer
            focus:outline-none
            focus-visible:ring-1 focus-visible:ring-[var(--color-primary)]
            focus-visible:ring-offset-1 rounded-sm
          "
        >
          {saved ? "✓ System saved!" : "Save my system for later"}
        </button>
      </div>
    </div>
  );
}
