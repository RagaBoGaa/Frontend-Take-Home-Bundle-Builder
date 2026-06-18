import type { ReviewLineItemData } from "../../types";
import { useBundle } from "../../context/BundleContext";
import QuantityStepper from "../Builder/QuantityStepper";
import ReviewLineItemDetails from "./ReviewLineItemDetails";
import ReviewLineItemPrice from "./ReviewLineItemPrice";

interface ReviewLineItemProps {
  item: ReviewLineItemData;
}

export default function ReviewLineItem({ item }: ReviewLineItemProps) {
  const { dispatch } = useBundle();

  const handleIncrement = () => {
    dispatch({ type: "INCREMENT", payload: { key: item.selectionKey } });
  };

  const handleDecrement = () => {
    dispatch({ type: "DECREMENT", payload: { key: item.selectionKey } });
  };

  const isMonthly = item.priceFormat === "monthly";

  return (
    <li role="listitem" className="flex items-center gap-4">
      <ReviewLineItemDetails item={item} />

      {!isMonthly && (
        <QuantityStepper
          value={item.quantity}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          compact
          disabled={item.isRequired}
        />
      )}

      <ReviewLineItemPrice
        price={item.price}
        quantity={item.quantity}
        compareAtPrice={item.compareAtPrice}
        isMonthly={isMonthly}
        isFree={item.isFree}
      />
    </li>
  );
}
