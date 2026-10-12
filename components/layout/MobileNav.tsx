"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useUi } from "@/lib/store";

const links = [
  { href: "/collections/new-arrivals", label: "New Arrivals" },
  { href: "/collections/women", label: "Women" },
  { href: "/collections/men", label: "Men" },
  { href: "/collections/accessories", label: "Accessories" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/search", label: "Search" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/about", label: "About" },
];

export default function MobileNav() {
  const { mobileNavOpen, setMobileNavOpen } = useUi();
  const pathname = usePathname();

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname, setMobileNavOpen]);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileNavOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen, setMobileNavOpen]);

  if (!mobileNavOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="absolute inset-0 bg-foreground/40" onClick={() => setMobileNavOpen(false)} />
      <div className="relative h-full w-[85%] max-w-sm bg-background p-6 shadow-xl">
        <div className="mb-10 flex items-center justify-between">
          <span className="font-display text-lg tracking-[0.3em]">VESTRA</span>
          <button type="button" aria-label="Close menu" onClick={() => setMobileNavOpen(false)}>
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
        <nav className="flex flex-col gap-5" aria-label="Mobile">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-2xl text-foreground"
              onClick={() => setMobileNavOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
