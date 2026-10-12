import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { collections } from "@/lib/data";

export const metadata: Metadata = {
  title: "Collections",
  description: "Browse every VESTRA collection — new arrivals, women, men, accessories and bestsellers.",
};

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 py-16 md:px-8">
      <p className="eyebrow mb-3">Browse</p>
      <h1 className="mb-10 font-display text-4xl md:text-5xl">Collections</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((collection) => (
          <Link
            key={collection.slug}
            href={`/collections/${collection.slug}`}
            className="group relative aspect-[4/5] overflow-hidden bg-muted"
          >
            <Image
              src={collection.image}
              alt={collection.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <p className="text-[11px] uppercase tracking-[0.25em] text-white/80">{collection.subtitle}</p>
              <p className="mt-1 font-display text-3xl">{collection.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
