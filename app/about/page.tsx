import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Our Story",
  description: "VESTRA makes modern essentials in natural fabrics, in small runs, by workshops we know by name.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-16 md:px-8">
      <p className="eyebrow mb-3">Our story</p>
      <h1 className="max-w-2xl font-display text-4xl italic leading-tight md:text-6xl">
        Clothing that asks for nothing and gives back quietly
      </h1>

      <div className="relative mt-12 aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80"
          alt="Inside the VESTRA atelier"
          fill
          priority
          sizes="(max-width: 1100px) 100vw, 1100px"
          className="object-cover"
        />
      </div>

      <div className="mt-12 grid gap-10 text-sm leading-relaxed text-muted-foreground md:grid-cols-2">
        <div className="space-y-4">
          <p>
            VESTRA began with a simple frustration: wardrobes full of clothes, nothing to wear. We wanted fewer,
            better things — pieces in honest fabrics that earn their place over years, not seasons.
          </p>
          <p>
            We produce in small runs with workshops we visit in person: a family mill in northern Portugal for
            knits, a Japanese selvedge denim house, a leather atelier outside Florence. No mystery in the supply
            chain, and no trend chasing.
          </p>
        </div>
        <div className="space-y-4">
          <p>
            Every piece is priced without theatre — the cost of good cloth, fair work and a small margin. What you
            don&apos;t pay for: seasons of discounting, or marketing you&apos;ll forget by next month.
          </p>
          <p>
            We repair what we sell. Send anything back within two years and our tailors will mend it, because the
            most sustainable garment is the one already hanging in your wardrobe.
          </p>
        </div>
      </div>

      <div className="mt-16 grid gap-8 border-t border-border pt-10 md:grid-cols-3">
        {[
          { stat: "14", label: "Partner workshops" },
          { stat: "92%", label: "Natural fibres" },
          { stat: "2 yr", label: "Repair guarantee" },
        ].map((item) => (
          <div key={item.label} className="text-center">
            <p className="font-display text-4xl">{item.stat}</p>
            <p className="eyebrow mt-2">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
