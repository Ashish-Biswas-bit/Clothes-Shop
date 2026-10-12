import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

const shop = [
  { href: "/collections/new-arrivals", label: "New Arrivals" },
  { href: "/collections/women", label: "Women" },
  { href: "/collections/men", label: "Men" },
  { href: "/collections/accessories", label: "Accessories" },
  { href: "/collections/bestsellers", label: "Bestsellers" },
];

const help = [
  { href: "/about", label: "Shipping & Returns" },
  { href: "/about", label: "Size Guide" },
  { href: "/about", label: "Care Instructions" },
  { href: "/about", label: "Contact" },
];

const brand = [
  { href: "/about", label: "Our Story" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/lookbook/atelier-notes", label: "Atelier Notes" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-[1600px] px-4 py-16 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl tracking-[0.3em]">VESTRA</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Modern essentials in natural fabrics, made in small runs by workshops we know by name.
            </p>
            <p className="eyebrow mt-10 mb-3">Newsletter</p>
            <NewsletterForm />
          </div>
          <div>
            <p className="eyebrow mb-5">Shop</p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {shop.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-5">Customer care</p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {help.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-5">House</p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {brand.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <a href="#" aria-label="Instagram" className="hover:text-foreground">
                Instagram
              </a>
              <a href="#" aria-label="Pinterest" className="hover:text-foreground">
                Pinterest
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-foreground">
                YouTube
              </a>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Vestra. All rights reserved.</p>
          <p>Privacy · Terms · Cookies</p>
        </div>
      </div>
    </footer>
  );
}
