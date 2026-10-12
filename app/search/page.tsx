import type { Metadata } from "next";
import { searchProducts } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import SearchBox from "@/components/SearchBox";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = searchProducts(q);

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-16 md:px-8">
      <p className="eyebrow mb-3">Search</p>
      <h1 className="mb-10 font-display text-4xl md:text-5xl">Find a piece</h1>
      <SearchBox key={q} initialQuery={q} />

      <div className="mt-12">
        {q.trim() === "" ? (
          <p className="text-sm text-muted-foreground">
            Try “wool”, “silk”, “denim” or a color like “ivory”.
          </p>
        ) : results.length === 0 ? (
          <div className="flex min-h-48 flex-col items-center justify-center gap-3 border border-dashed border-border text-center">
            <p className="font-display text-2xl">No results for “{q}”</p>
            <p className="text-sm text-muted-foreground">Check the spelling or browse our collections instead.</p>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-muted-foreground">
              {results.length} {results.length === 1 ? "result" : "results"} for “{q}”
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
