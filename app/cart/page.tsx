"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { cartCount, cartSubtotal, useCart } from "@/lib/store";
import { formatPrice } from "@/lib/format";
import { useMounted } from "@/lib/use-mounted";

const FREE_SHIPPING_THRESHOLD = 150;

export default function CartPage() {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const mounted = useMounted();
  const subtotal = cartSubtotal(items);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 12;

  if (!mounted) {
    return (
      <div className="mx-auto max-w-[1100px] px-4 py-16 md:px-8">
        <div className="h-10 w-48 animate-pulse bg-muted" />
        <div className="mt-10 h-64 animate-pulse bg-muted" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-[1100px] flex-col items-center justify-center gap-5 px-4 text-center">
        <p className="font-display text-3xl">Your bag is empty</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Explore new arrivals, tailoring and accessories — everything is made in small runs.
        </p>
        <Link href="/collections/new-arrivals" className="btn-primary">
          Shop new arrivals
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-16 md:px-8">
      <h1 className="mb-10 font-display text-4xl">Your bag</h1>
      <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
        <ul className="divide-y divide-border border-y border-border">
          {items.map((item) => (
            <li key={item.key} className="flex gap-6 py-6">
              <Link href={`/products/${item.handle}`} className="relative h-36 w-28 shrink-0 overflow-hidden bg-muted">
                <Image src={item.image} alt={item.title} fill sizes="112px" className="object-cover" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex justify-between gap-4">
                  <Link href={`/products/${item.handle}`} className="text-sm hover:underline">
                    {item.title}
                  </Link>
                  <p className="text-sm">{formatPrice(item.price * item.qty)}</p>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.color} · {item.size}
                </p>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-center border border-border">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      className="px-3 py-2 hover:bg-muted"
                      onClick={() => setQty(item.key, item.qty - 1)}
                    >
                      <Minus className="h-3 w-3" strokeWidth={1.5} />
                    </button>
                    <span className="min-w-8 text-center text-xs">{item.qty}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      className="px-3 py-2 hover:bg-muted"
                      onClick={() => setQty(item.key, item.qty + 1)}
                    >
                      <Plus className="h-3 w-3" strokeWidth={1.5} />
                    </button>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${item.title}`}
                    className="text-muted-foreground hover:text-foreground"
                    onClick={() => remove(item.key)}
                  >
                    <X className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit space-y-5 border border-border bg-card p-6 lg:sticky lg:top-28">
          <p className="eyebrow">Order summary</p>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal ({cartCount(items)} items)</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-3 font-medium">
              <span>Total</span>
              <span>{formatPrice(subtotal + shipping)}</span>
            </div>
          </div>
          {shipping > 0 && (
            <p className="text-xs text-muted-foreground">
              Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for complimentary shipping.
            </p>
          )}
          <button type="button" className="btn-primary w-full" disabled>
            Checkout — demo store
          </button>
          <p className="text-center text-xs text-muted-foreground">
            Taxes calculated at checkout. Payments are disabled in this demo.
          </p>
        </aside>
      </div>
    </div>
  );
}
