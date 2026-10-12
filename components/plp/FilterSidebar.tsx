"use client";

import { useCollectionParams } from "./useCollectionParams";

export type Facets = {
  sizes: string[];
  colors: { name: string; hex: string }[];
  priceMax: number;
};

export default function FilterSidebar({ facets }: { facets: Facets }) {
  const { searchParams, setParams } = useCollectionParams();
  const size = searchParams.get("size") ?? "";
  const color = searchParams.get("color") ?? "";
  const max = searchParams.get("max") ?? "";

  const priceRanges = [
    { label: "Under $100", value: "100" },
    { label: "Under $200", value: "200" },
    { label: "Under $400", value: "400" },
  ].filter((r) => Number(r.value) <= facets.priceMax);

  return (
    <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
      <div>
        <p className="eyebrow mb-4">Size</p>
        <div className="flex flex-wrap gap-2">
          {facets.sizes.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={s === size}
              className={`min-w-10 border px-2.5 py-2 text-xs uppercase tracking-[0.1em] transition-colors ${
                s === size ? "border-foreground bg-foreground text-primary-foreground" : "border-border hover:border-foreground"
              }`}
              onClick={() => setParams({ size: s === size ? undefined : s })}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="eyebrow mb-4">Color</p>
        <div className="flex flex-wrap gap-3">
          {facets.colors.map((c) => (
            <button
              key={c.name}
              type="button"
              aria-label={c.name}
              aria-pressed={c.name === color}
              title={c.name}
              className={`h-7 w-7 rounded-full border transition-all ${
                c.name === color ? "border-foreground ring-1 ring-foreground ring-offset-2 ring-offset-background" : "border-border"
              }`}
              style={{ backgroundColor: c.hex }}
              onClick={() => setParams({ color: c.name === color ? undefined : c.name })}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="eyebrow mb-4">Price</p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {priceRanges.map((range) => (
            <li key={range.value}>
              <button
                type="button"
                aria-pressed={max === range.value}
                className={`hover:text-foreground ${max === range.value ? "text-foreground underline underline-offset-4" : ""}`}
                onClick={() => setParams({ max: max === range.value ? undefined : range.value })}
              >
                {range.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
