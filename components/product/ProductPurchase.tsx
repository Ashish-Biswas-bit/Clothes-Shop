"use client";

import { Check, Minus, Plus } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useCart, useUi } from "@/lib/store";
import WishlistButton from "./WishlistButton";

export default function ProductPurchase({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const [size, setSize] = useState(product.category === "accessories" ? product.sizes[0] ?? "" : "");
  const [qty, setQty] = useState(1);
  const [error, setError] = useState(false);
  const add = useCart((s) => s.add);
  const setCartOpen = useUi((s) => s.setCartOpen);

  const addToBag = () => {
    if (!size) {
      setError(true);
      return;
    }
    add({
      handle: product.handle,
      title: product.title,
      image: product.images[0],
      price: product.price,
      color,
      size,
      qty,
    });
    setCartOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow mb-3">Color — {color}</p>
        <div className="flex gap-3">
          {product.colors.map((c) => (
            <button
              key={c.name}
              type="button"
              aria-label={c.name}
              aria-pressed={c.name === color}
              className={`h-8 w-8 rounded-full border transition-all ${
                c.name === color ? "border-foreground ring-1 ring-foreground ring-offset-2 ring-offset-background" : "border-border"
              }`}
              style={{ backgroundColor: c.hex }}
              onClick={() => setColor(c.name)}
            />
          ))}
        </div>
      </div>

      {product.sizes.length > 1 && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="eyebrow">Size</p>
            <details className="group text-xs text-muted-foreground">
              <summary className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-foreground">
                Size guide
              </summary>
              <div className="mt-3 w-64 border border-border bg-card p-4 text-left text-xs">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-1 text-left font-medium">Size</th>
                      <th className="py-1 text-left font-medium">Bust (cm)</th>
                      <th className="py-1 text-left font-medium">Waist (cm)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr><td className="py-1">XS</td><td className="py-1">82</td><td className="py-1">64</td></tr>
                    <tr><td className="py-1">S</td><td className="py-1">86</td><td className="py-1">68</td></tr>
                    <tr><td className="py-1">M</td><td className="py-1">90</td><td className="py-1">72</td></tr>
                    <tr><td className="py-1">L</td><td className="py-1">96</td><td className="py-1">78</td></tr>
                    <tr><td className="py-1">XL</td><td className="py-1">102</td><td className="py-1">84</td></tr>
                  </tbody>
                </table>
              </div>
            </details>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={s === size}
                className={`min-w-12 border px-4 py-3 text-xs uppercase tracking-[0.15em] transition-colors ${
                  s === size
                    ? "border-foreground bg-foreground text-primary-foreground"
                    : "border-border hover:border-foreground"
                }`}
                onClick={() => {
                  setSize(s);
                  setError(false);
                }}
              >
                {s}
              </button>
            ))}
          </div>
          {error && (
            <p className="mt-2 text-xs text-sale" role="alert">
              Please select a size.
            </p>
          )}
        </div>
      )}

      <div className="flex items-stretch gap-3">
        <div className="flex items-center border border-border">
          <button
            type="button"
            aria-label="Decrease quantity"
            className="px-4 py-4 hover:bg-muted"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
          >
            <Minus className="h-3 w-3" strokeWidth={1.5} />
          </button>
          <span className="min-w-8 text-center text-sm">{qty}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            className="px-4 py-4 hover:bg-muted"
            onClick={() => setQty((q) => q + 1)}
          >
            <Plus className="h-3 w-3" strokeWidth={1.5} />
          </button>
        </div>
        <button type="button" className="btn-primary flex-1" onClick={addToBag}>
          Add to bag — {formatPrice(product.price * qty)}
        </button>
        <WishlistButton productId={product.id} className="h-auto w-14 border border-border bg-transparent hover:bg-muted" />
      </div>

      <ul className="space-y-2 border-t border-border pt-6 text-xs text-muted-foreground">
        <li className="flex items-center gap-2">
          <Check className="h-3.5 w-3.5" strokeWidth={1.5} /> In stock — ships within 48 hours
        </li>
        <li className="flex items-center gap-2">
          <Check className="h-3.5 w-3.5" strokeWidth={1.5} /> Complimentary shipping over $150
        </li>
        <li className="flex items-center gap-2">
          <Check className="h-3.5 w-3.5" strokeWidth={1.5} /> 30-day free returns
        </li>
      </ul>
    </div>
  );
}
