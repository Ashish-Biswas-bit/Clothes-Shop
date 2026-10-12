"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useCollectionParams } from "./useCollectionParams";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

export default function FilterToolbar({
  count,
  filtersOpen,
  onToggleFilters,
}: {
  count: number;
  filtersOpen: boolean;
  onToggleFilters: () => void;
}) {
  const { searchParams, setParams } = useCollectionParams();
  const sort = searchParams.get("sort") ?? "featured";
  const activeCount = ["size", "color", "max"].filter((k) => searchParams.get(k)).length;

  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em]"
          aria-expanded={filtersOpen}
          onClick={onToggleFilters}
        >
          <SlidersHorizontal className="h-4 w-4" strokeWidth={1.5} />
          Filters {activeCount > 0 && <span className="text-muted-foreground">({activeCount})</span>}
        </button>
        <span className="text-xs text-muted-foreground">
          {count} {count === 1 ? "item" : "items"}
        </span>
        {activeCount > 0 && (
          <button
            type="button"
            className="flex items-center gap-1 text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
            onClick={() => setParams({ size: undefined, color: undefined, max: undefined })}
          >
            <X className="h-3 w-3" strokeWidth={1.5} /> Clear all
          </button>
        )}
      </div>
      <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em]">
        <span className="hidden sm:inline">Sort</span>
        <select
          value={sort}
          onChange={(e) => setParams({ sort: e.target.value === "featured" ? undefined : e.target.value })}
          className="cursor-pointer border border-border bg-transparent px-2 py-1.5 text-xs tracking-normal focus:outline-none"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
