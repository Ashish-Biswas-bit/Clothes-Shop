import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { lookbooks } from "@/lib/data";

export const metadata: Metadata = {
  title: "Lookbook",
  description: "Campaigns, editorials and notes from the VESTRA atelier.",
};

export default function LookbookPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 py-16 md:px-8">
      <p className="eyebrow mb-3">Stories</p>
      <h1 className="mb-12 font-display text-4xl md:text-5xl">Lookbook</h1>
      <div className="space-y-4">
        {lookbooks.map((entry, i) => (
          <Link
            key={entry.slug}
            href={`/lookbook/${entry.slug}`}
            className="group grid gap-6 md:grid-cols-2"
          >
            <div className={`relative aspect-[4/3] overflow-hidden bg-muted md:aspect-[16/10] ${i % 2 === 1 ? "md:order-2" : ""}`}>
              <Image
                src={entry.cover}
                alt={entry.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center md:px-8">
              <p className="eyebrow mb-3">{entry.season}</p>
              <h2 className="font-display text-3xl md:text-4xl">{entry.title}</h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">{entry.intro}</p>
              <span className="mt-6 text-[11px] uppercase tracking-[0.2em] underline underline-offset-4">
                Read the story
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
