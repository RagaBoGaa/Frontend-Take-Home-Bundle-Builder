import type { Product } from "../../types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const isOdd = products.length % 2 !== 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[15px] p-[15px] pt-0">
      {products.map((product, index) => {
        const isLastOdd = isOdd && index === products.length - 1;
        return (
          <div
            key={product.id}
            className={
              isLastOdd
                ? "sm:col-span-2 sm:justify-self-center sm:w-[calc(50%-7.5px)]"
                : ""
            }
          >
            <ProductCard product={product} />
          </div>
        );
      })}
    </div>
  );
}
