"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, Search, ShoppingBag } from "lucide-react";
import { cartCount, useCart, useUi } from "@/lib/store";
import { useMounted } from "@/lib/use-mounted";
import MobileNav from "./MobileNav";
import SearchOverlay from "./SearchOverlay";

const links = [
  { href: "/collections/new-arrivals", label: "New Arrivals" },
  { href: "/collections/women", label: "Women" },
  { href: "/collections/men", label: "Men" },
  { href: "/collections/accessories", label: "Accessories" },
  { href: "/lookbook", label: "Lookbook" },
];

export default function Header() {
  const pathname = usePathname();
  const items = useCart((s) => s.items);
  const { setCartOpen, setMobileNavOpen, setSearchOpen } = useUi();
  const mounted = useMounted();
  const count = mounted ? cartCount(items) : 0;

  return (
    <>
      <div className="overflow-hidden bg-primary text-primary-foreground">
        <div className="flex w-max animate-marquee whitespace-nowrap py-2 text-[10px] uppercase tracking-[0.3em]">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex">
              {["Complimentary shipping over $150", "Easy 30-day returns", "New: Autumn / Winter 2026"].map((msg) => (
                <span key={msg} className="px-8">
                  {msg} <span aria-hidden>·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto grid max-w-[1600px] grid-cols-3 items-center px-4 py-4 md:px-8">
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`link-underline text-[11px] uppercase tracking-[0.18em] transition-colors hover:text-foreground ${
                  pathname.startsWith(link.href) ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="flex items-center gap-2 lg:hidden"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <Link href="/" className="justify-self-center font-display text-xl tracking-[0.35em] md:text-2xl">
            VESTRA
          </Link>
          <div className="flex items-center justify-end gap-4">
            <button type="button" aria-label="Search" onClick={() => setSearchOpen(true)}>
              <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>
            <Link href="/wishlist" aria-label="Wishlist" className="hidden sm:block">
              <Heart className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </Link>
            <button
              type="button"
              aria-label={`Bag, ${count} items`}
              className="relative"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
      <MobileNav />
      <SearchOverlay />
    </>
  );
}
