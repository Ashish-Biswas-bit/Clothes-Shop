import Image from "next/image";
import Link from "next/link";
import { RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { collections, heroImage, products } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import SectionHeader from "@/components/home/SectionHeader";
import HeroVideo from "@/components/home/HeroVideo";

const railSizes = "(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 300px";

export default function HomePage() {
  const newArrivals = products.filter((p) => p.isNew).slice(0, 8);
  const bestsellers = products.filter((p) => p.badge === "bestseller").slice(0, 4);
  const tiles = collections.filter((c) => ["women", "men", "accessories"].includes(c.slug));

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[85vh] overflow-hidden">
        <HeroVideo src="/videos/hero.mp4" poster={heroImage} />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 pb-16 text-white md:p-12 md:pb-20">
          <div className="mx-auto max-w-[1600px]">
            <p className="mb-3 text-[11px] uppercase tracking-[0.3em]">Autumn / Winter 2026</p>
            <h1 className="max-w-2xl font-display text-4xl italic leading-tight md:text-6xl">
              Quiet luxury, made for every day
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/85">
              Washed silk, double-faced wool and raw Japanese denim. Clothing that asks for nothing and gives back quietly.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/collections/new-arrivals" className="btn-light">
                Shop new arrivals
              </Link>
              <Link
                href="/lookbook/autumn-winter-26"
                className="btn border border-white/60 px-8 py-4 text-white transition-colors hover:bg-white hover:text-foreground"
              >
                View the campaign
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category tiles */}
      <section className="mx-auto max-w-[1600px] px-4 py-20 md:px-8">
        <SectionHeader eyebrow="Shop by category" title="The collections" href="/collections/new-arrivals" />
        <div className="grid gap-4 md:grid-cols-3">
          {tiles.map((tile) => (
            <Link key={tile.slug} href={`/collections/${tile.slug}`} className="group relative aspect-[4/5] overflow-hidden bg-muted">
              <Image
                src={tile.image}
                alt={tile.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <p className="text-[11px] uppercase tracking-[0.25em] text-white/80">{tile.subtitle}</p>
                <p className="mt-1 font-display text-3xl">{tile.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New arrivals rail */}
      <section className="mx-auto max-w-[1600px] px-4 pb-20 md:px-8">
        <SectionHeader eyebrow="Just in" title="New arrivals" href="/collections/new-arrivals" />
        <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
          {newArrivals.map((product, i) => (
            <div key={product.id} className="w-[70vw] shrink-0 snap-start sm:w-[40vw] md:w-[300px]">
              <ProductCard product={product} eager={i < 2} sizes={railSizes} />
            </div>
          ))}
        </div>
      </section>

      {/* Editorial banner */}
      <section className="mx-auto max-w-[1600px] px-4 pb-20 md:px-8">
        <div className="grid items-stretch gap-0 md:grid-cols-2">
          <div className="relative min-h-[420px] overflow-hidden bg-muted">
            <Image
              src={collections[0].image}
              alt="The season in cloth"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center bg-card p-10 md:p-16">
            <p className="eyebrow mb-4">The journal</p>
            <h2 className="font-display text-3xl italic leading-snug md:text-4xl">
              Six months with one pair of raw selvedge denim
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              We followed a single pair of jeans from rigid indigo to a soft, lived-in fade — and asked what really
              happens inside a Japanese mill.
            </p>
            <div className="mt-8">
              <Link href="/lookbook/the-denim-story" className="btn-outline">
                Read the story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="mx-auto max-w-[1600px] px-4 pb-20 md:px-8">
        <SectionHeader eyebrow="Loved by many" title="Bestsellers" href="/collections/bestsellers" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Values strip */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto grid max-w-[1600px] gap-8 px-4 py-12 md:grid-cols-3 md:px-8">
          {[
            { icon: Truck, title: "Complimentary shipping", copy: "On all orders over $150, worldwide." },
            { icon: RotateCcw, title: "30-day returns", copy: "Free returns and exchanges, no questions." },
            { icon: ShieldCheck, title: "Made to last", copy: "Two-year repair guarantee on every piece." },
          ].map(({ icon: Icon, title, copy }) => (
            <div key={title} className="flex items-start gap-4">
              <Icon className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em]">{title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
