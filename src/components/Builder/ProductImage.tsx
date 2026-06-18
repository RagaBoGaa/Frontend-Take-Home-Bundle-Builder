interface ProductImageProps {
  image: string;
  name: string;
}

export default function ProductImage({ image, name }: ProductImageProps) {
  return (
    <div className="w-full h-24 mt-6 flex justify-center items-center">
      <img
        src={image}
        alt={name}
        className="max-h-full max-w-full object-contain"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            `https://placehold.co/120x120/f5f5f5/999?text=${encodeURIComponent(
              name.split(" ").slice(0, 2).join(" "),
            )}`;
        }}
      />
    </div>
  );
}
