"use client";

import Image from "next/image";
import { useState } from "react";

export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-3">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <Image
          key={images[active]}
          src={images[active]}
          alt={`${alt} — view ${active + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          preload
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`View image ${i + 1}`}
              aria-current={i === active}
              className={`relative aspect-[3/4] w-20 overflow-hidden bg-muted transition-opacity ${
                i === active ? "ring-1 ring-foreground" : "opacity-60 hover:opacity-100"
              }`}
              onClick={() => setActive(i)}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
