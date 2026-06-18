import { useBundle } from "../../context/BundleContext";
import ReviewShippingRow from "./ReviewShippingRow";
import ReviewTotalSection from "./ReviewTotalSection";
import ReviewSavingsCallout from "./ReviewSavingsCallout";

export default function ReviewSummary() {
  const { data, getTotals } = useBundle();
  const { subtotal, compareAtTotal, savings } = getTotals();

  return (
    <div className="mt-4 pt-3 border-t border-[#CED6DE]">
      <ReviewShippingRow
        icon={data.shipping.icon}
        label={data.shipping.label}
        compareAtPrice={data.shipping.compareAtPrice}
      />

      <ReviewTotalSection
        financingText={data.financing.text}
        subtotal={subtotal}
        compareAtTotal={compareAtTotal}
      />

      <ReviewSavingsCallout savings={savings} />
    </div>
  );
}
