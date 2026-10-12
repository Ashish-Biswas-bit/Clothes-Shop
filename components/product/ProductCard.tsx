import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import WishlistButton from "./WishlistButton";

const badgeLabel: Record<NonNullable<Product["badge"]>, string> = {
  new: "New",
  sale: "Sale",
  bestseller: "Bestseller",
};

export default function ProductCard({
  product,
  eager = false,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
}: {
  product: Product;
  eager?: boolean;
  sizes?: string;
}) {
  return (
    <div className="group relative">
      <Link href={`/products/${product.handle}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes={sizes}
            className="object-cover transition-opacity duration-500 group-hover:opacity-0"
            preload={eager ? true : undefined}
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt=""
              fill
              sizes={sizes}
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
          {product.badge && (
            <span
              className={`absolute left-3 top-3 px-2 py-1 text-[10px] uppercase tracking-[0.2em] ${
                product.badge === "sale" ? "bg-sale text-white" : "bg-background text-foreground"
              }`}
            >
              {badgeLabel[product.badge]}
            </span>
          )}
        </div>
        <div className="mt-3 space-y-1.5">
          <h3 className="text-sm">{product.title}</h3>
          <div className="flex items-center gap-2">
            {product.colors.slice(0, 3).map((c) => (
              <span
                key={c.name}
                className="h-2.5 w-2.5 rounded-full border border-border"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
          <p className="flex items-center gap-2 text-sm">
            <span className={product.compareAtPrice ? "text-sale" : ""}>{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-muted-foreground line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
          </p>
        </div>
      </Link>
      <WishlistButton productId={product.id} className="absolute right-3 top-3" />
    </div>
  );
}
