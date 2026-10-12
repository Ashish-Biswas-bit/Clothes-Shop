"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useUi } from "@/lib/store";
import { formatPrice } from "@/lib/format";

type Result = {
  handle: string;
  title: string;
  price: number;
  image: string;
};

export default function SearchOverlay() {
  const searchOpen = useUi((s) => s.searchOpen);
  if (!searchOpen) return null;
  return <SearchPanel />;
}

function SearchPanel() {
  const setSearchOpen = useUi((s) => s.setSearchOpen);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSearchOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [setSearchOpen]);

  useEffect(() => {
    const q = query.trim();
    if (!q) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, { signal: controller.signal });
        if (!res.ok) throw new Error("search failed");
        const data = (await res.json()) as { results: Result[] };
        setResults(data.results);
      } catch {
        /* aborted or failed — keep the UI quiet */
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Search">
      <div className="absolute inset-0 bg-foreground/40" onClick={() => setSearchOpen(false)} />
      <div className="relative bg-background px-4 pb-10 pt-6 shadow-xl md:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-4 flex items-center justify-between">
            <span className="eyebrow">Search</span>
            <button type="button" aria-label="Close search" onClick={() => setSearchOpen(false)}>
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
          <form onSubmit={submit} className="flex items-center gap-3 border-b border-foreground pb-3">
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" strokeWidth={1.5} />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for coats, silk, denim…"
              className="w-full bg-transparent text-lg placeholder:text-muted-foreground focus:outline-none"
              aria-label="Search products"
            />
          </form>
          <div className="mt-6">
            {loading && <p className="text-sm text-muted-foreground">Searching…</p>}
            {!loading && query.trim() && results.length === 0 && (
              <p className="text-sm text-muted-foreground">No results for “{query.trim()}”. Try another word.</p>
            )}
            <ul className="divide-y divide-border">
              {results.map((r) => (
                <li key={r.handle}>
                  <Link
                    href={`/products/${r.handle}`}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center gap-4 py-3 transition-opacity hover:opacity-70"
                  >
                    <div className="relative h-16 w-12 shrink-0 overflow-hidden bg-muted">
                      <Image src={r.image} alt={r.title} fill sizes="48px" className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm">{r.title}</p>
                      <p className="text-sm text-muted-foreground">{formatPrice(r.price)}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            {query.trim() && results.length > 0 && (
              <button
                type="button"
                className="mt-4 text-[11px] uppercase tracking-[0.2em] underline underline-offset-4"
                onClick={submit}
              >
                View all results
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
