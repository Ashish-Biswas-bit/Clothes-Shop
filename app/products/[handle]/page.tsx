import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getRelatedProducts, products } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import Gallery from "@/components/product/Gallery";
import ProductPurchase from "@/components/product/ProductPurchase";
import ProductCard from "@/components/product/ProductCard";
import Rating from "@/components/product/Rating";

export const dynamicParams = true;

export function generateStaticParams() {
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) return {};
  return {
    title: product.title,
    description: product.description,
    openGraph: { images: [product.images[0]], title: product.title },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const categoryLabel = product.category.charAt(0).toUpperCase() + product.category.slice(1);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-12 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="eyebrow mb-8" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <span className="px-2" aria-hidden>/</span>
        <Link href={`/collections/${product.category}`} className="hover:text-foreground">{categoryLabel}</Link>
        <span className="px-2" aria-hidden>/</span>
        <span className="text-foreground">{product.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Gallery images={product.images} alt={product.title} />

        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex items-center justify-between gap-4">
            <p className="eyebrow">{categoryLabel}</p>
            {product.badge && (
              <span
                className={`px-2 py-1 text-[10px] uppercase tracking-[0.2em] ${
                  product.badge === "sale" ? "bg-sale text-white" : "bg-muted text-foreground"
                }`}
              >
                {product.badge}
              </span>
            )}
          </div>
          <h1 className="mt-3 font-display text-3xl md:text-4xl">{product.title}</h1>
          <div className="mt-4 flex items-center gap-4">
            <Rating rating={product.rating} reviewCount={product.reviewCount} />
          </div>
          <p className="mt-4 flex items-baseline gap-3 text-lg">
            <span className={product.compareAtPrice ? "text-sale" : ""}>{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-sm text-muted-foreground line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
          </p>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="mt-8">
            <ProductPurchase product={product} />
          </div>

          <div className="mt-10 divide-y divide-border border-y border-border">
            <details className="group py-4">
              <summary className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em]">
                Fabric & care
                <span className="transition-transform group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                {product.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </details>
            <details className="group py-4">
              <summary className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em]">
                Shipping & returns
                <span className="transition-transform group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                <p>Complimentary shipping on orders over $150. Delivered in 2–5 business days.</p>
                <p>Free returns and exchanges within 30 days of delivery.</p>
              </div>
            </details>
          </div>
        </div>
      </div>

      <section className="mt-24">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-3xl">You may also like</h2>
          <Link
            href={`/collections/${product.category}`}
            className="text-[11px] uppercase tracking-[0.2em] underline underline-offset-4 hover:opacity-70"
          >
            View all {categoryLabel}
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
