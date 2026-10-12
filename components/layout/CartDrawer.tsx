"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useEffect } from "react";
import { cartSubtotal, useCart, useUi } from "@/lib/store";
import { formatPrice } from "@/lib/format";

export default function CartDrawer() {
  const { cartOpen, setCartOpen } = useUi();
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const subtotal = cartSubtotal(items);

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCartOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [cartOpen, setCartOpen]);

  return (
    <div className={`fixed inset-0 z-50 ${cartOpen ? "" : "pointer-events-none"}`} aria-hidden={!cartOpen}>
      <div
        className={`absolute inset-0 bg-foreground/40 transition-opacity duration-300 ${
          cartOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setCartOpen(false)}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-xl transition-transform duration-300 ease-out ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="text-[11px] uppercase tracking-[0.25em]">Your bag ({items.length})</h2>
          <button type="button" aria-label="Close bag" onClick={() => setCartOpen(false)}>
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-display text-2xl">Your bag is empty</p>
            <p className="text-sm text-muted-foreground">Explore the new season and find something quietly excellent.</p>
            <Link href="/collections/new-arrivals" className="btn-primary" onClick={() => setCartOpen(false)}>
              Shop new arrivals
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-6">
              {items.map((item) => (
                <li key={item.key} className="flex gap-4 py-5">
                  <Link
                    href={`/products/${item.handle}`}
                    onClick={() => setCartOpen(false)}
                    className="relative h-28 w-20 shrink-0 overflow-hidden bg-muted"
                  >
                    <Image src={item.image} alt={item.title} fill sizes="80px" className="object-cover" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex justify-between gap-3">
                      <p className="text-sm">{item.title}</p>
                      <p className="text-sm">{formatPrice(item.price * item.qty)}</p>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.color} · {item.size}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center border border-border">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          className="px-2.5 py-1.5 hover:bg-muted"
                          onClick={() => setQty(item.key, item.qty - 1)}
                        >
                          <Minus className="h-3 w-3" strokeWidth={1.5} />
                        </button>
                        <span className="min-w-8 text-center text-xs">{item.qty}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          className="px-2.5 py-1.5 hover:bg-muted"
                          onClick={() => setQty(item.key, item.qty + 1)}
                        >
                          <Plus className="h-3 w-3" strokeWidth={1.5} />
                        </button>
                      </div>
                      <button
                        type="button"
                        className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
                        onClick={() => remove(item.key)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="space-y-4 border-t border-border px-6 py-6">
              <div className="flex justify-between text-sm">
                <span className="uppercase tracking-[0.2em]">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {subtotal >= 150 ? "Complimentary shipping applied." : `Add ${formatPrice(150 - subtotal)} for complimentary shipping.`}
              </p>
              <Link href="/cart" className="btn-outline w-full" onClick={() => setCartOpen(false)}>
                View bag
              </Link>
              <Link href="/cart" className="btn-primary w-full" onClick={() => setCartOpen(false)}>
                Checkout
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
