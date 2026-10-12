import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getCollection, getCollectionProducts } from "@/lib/data";
import type { Product } from "@/lib/types";
import CollectionClient from "@/components/plp/CollectionClient";
import type { Facets } from "@/components/plp/FilterSidebar";

type SearchParams = {
  size?: string;
  color?: string;
  max?: string;
  sort?: string;
};

function applyFilters(items: Product[], sp: SearchParams) {
  let result = [...items];
  if (sp.size) result = result.filter((p) => p.sizes.includes(sp.size as string));
  if (sp.color) result = result.filter((p) => p.colors.some((c) => c.name === sp.color));
  if (sp.max) result = result.filter((p) => p.price <= Number(sp.max));
  switch (sp.sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      result.sort((a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false));
      break;
  }
  return result;
}

function buildFacets(items: Product[]): Facets {
  const sizes = [...new Set(items.flatMap((p) => p.sizes))];
  const colors = [...new Map(items.flatMap((p) => p.colors).map((c) => [c.name, c])).values()];
  const priceMax = Math.max(...items.map((p) => p.price), 1);
  return { sizes, colors, priceMax };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return {};
  return {
    title: collection.title,
    description: collection.description,
    openGraph: { images: [collection.image] },
  };
}

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const base = getCollectionProducts(slug);
  const filtered = applyFilters(base, sp);
  const facets = buildFacets(base);

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-12 md:px-8">
      <nav className="eyebrow mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <span className="px-2" aria-hidden>/</span>
        <span>{collection.title}</span>
      </nav>
      <div className="mb-10 grid items-end gap-6 md:grid-cols-[1fr_320px]">
        <div>
          <p className="eyebrow mb-3">{collection.subtitle}</p>
          <h1 className="font-display text-4xl md:text-5xl">{collection.title}</h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">{collection.description}</p>
        </div>
        <div className="relative hidden aspect-[4/3] overflow-hidden bg-muted md:block">
          <Image
            src={collection.image}
            alt={collection.title}
            fill
            sizes="320px"
            className="object-cover"
            preload
          />
        </div>
      </div>
      <Suspense fallback={<div className="h-96 animate-pulse bg-muted" />}>
        <CollectionClient products={filtered} facets={facets} />
      </Suspense>
    </div>
  );
}
