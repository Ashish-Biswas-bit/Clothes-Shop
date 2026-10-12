"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import ProductCard from "@/components/product/ProductCard";
import FilterSidebar, { type Facets } from "./FilterSidebar";
import FilterToolbar from "./FilterToolbar";

export default function CollectionClient({
  products,
  facets,
  initialFiltersOpen = false,
}: {
  products: Product[];
  facets: Facets;
  initialFiltersOpen?: boolean;
}) {
  const [filtersOpen, setFiltersOpen] = useState(initialFiltersOpen);

  return (
    <>
      <FilterToolbar count={products.length} filtersOpen={filtersOpen} onToggleFilters={() => setFiltersOpen((o) => !o)} />
      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        <div className={`${filtersOpen ? "block" : "hidden"} lg:block`}>
          <FilterSidebar facets={facets} />
        </div>
        <div>
          {products.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center gap-3 border border-dashed border-border text-center">
              <p className="font-display text-2xl">Nothing matches those filters</p>
              <p className="text-sm text-muted-foreground">Try removing a filter to see more pieces.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} eager={i < 3} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
