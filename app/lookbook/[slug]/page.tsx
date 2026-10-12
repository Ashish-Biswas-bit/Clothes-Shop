import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { lookbooks } from "@/lib/data";

export function generateStaticParams() {
  return lookbooks.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = lookbooks.find((l) => l.slug === slug);
  if (!entry) return {};
  return {
    title: entry.title,
    description: entry.intro,
    openGraph: { images: [entry.cover] },
  };
}

export default async function LookbookEntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = lookbooks.find((l) => l.slug === slug);
  if (!entry) notFound();

  return (
    <article className="mx-auto max-w-[1100px] px-4 py-16 md:px-8">
      <nav className="eyebrow mb-8" aria-label="Breadcrumb">
        <Link href="/lookbook" className="hover:text-foreground">Lookbook</Link>
        <span className="px-2" aria-hidden>/</span>
        <span className="text-foreground">{entry.title}</span>
      </nav>

      <p className="eyebrow mb-3">{entry.season}</p>
      <h1 className="font-display text-4xl italic md:text-6xl">{entry.title}</h1>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">{entry.intro}</p>

      <div className="relative mt-12 aspect-[16/10] overflow-hidden bg-muted">
        <Image src={entry.cover} alt={entry.title} fill priority sizes="(max-width: 1100px) 100vw, 1100px" className="object-cover" />
      </div>

      <div className="mt-16 space-y-16">
        {entry.sections.map((section, i) => (
          <figure key={section.image} className="space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden bg-muted md:aspect-[16/10]">
              <Image
                src={section.image}
                alt={section.caption}
                fill
                sizes="(max-width: 1100px) 100vw, 1100px"
                className="object-cover"
                preload={i === 0 ? true : undefined}
              />
            </div>
            <figcaption className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {String(i + 1).padStart(2, "0")} — {section.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-20 border-t border-border pt-10 text-center">
        <p className="eyebrow mb-4">Shop the season</p>
        <Link href="/collections/new-arrivals" className="btn-primary">
          Explore new arrivals
        </Link>
      </div>
    </article>
  );
}
