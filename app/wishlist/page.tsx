"use client";

import Link from "next/link";
import { products } from "@/lib/data";
import { useWishlist } from "@/lib/store";
import { useMounted } from "@/lib/use-mounted";
import ProductCard from "@/components/product/ProductCard";

export default function WishlistPage() {
  const ids = useWishlist((s) => s.ids);
  const mounted = useMounted();
  const saved = mounted ? products.filter((p) => ids.includes(p.id)) : [];

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-16 md:px-8">
      <p className="eyebrow mb-3">Saved</p>
      <h1 className="mb-10 font-display text-4xl md:text-5xl">Wishlist</h1>
      {!mounted ? (
        <div className="h-64 animate-pulse bg-muted" />
      ) : saved.length === 0 ? (
        <div className="flex min-h-48 flex-col items-center justify-center gap-4 border border-dashed border-border text-center">
          <p className="font-display text-2xl">Nothing saved yet</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Tap the heart on any piece to keep it here for later.
          </p>
          <Link href="/collections/new-arrivals" className="btn-outline">
            Browse new arrivals
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
          {saved.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
