"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/store";

export default function WishlistButton({ productId, className = "" }: { productId: string; className?: string }) {
  const ids = useWishlist((s) => s.ids);
  const toggle = useWishlist((s) => s.toggle);
  const active = ids.includes(productId);

  return (
    <button
      type="button"
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
      className={`flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur transition-colors hover:bg-background ${className}`}
      onClick={(e) => {
        e.preventDefault();
        toggle(productId);
      }}
    >
      <Heart className={`h-4 w-4 ${active ? "fill-sale text-sale" : "text-foreground"}`} strokeWidth={1.5} />
    </button>
  );
}
