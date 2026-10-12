"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBox({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  useEffect(() => {
    const q = query.trim();
    if (!q || q === initialQuery.trim()) return;
    const timer = setTimeout(() => router.replace(`/search?q=${encodeURIComponent(q)}`, { scroll: false }), 400);
    return () => clearTimeout(timer);
  }, [query, initialQuery, router]);

  return (
    <form
      className="flex items-center gap-3 border-b border-foreground pb-3"
      onSubmit={(e) => {
        e.preventDefault();
        const q = query.trim();
        if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
      }}
    >
      <Search className="h-5 w-5 shrink-0 text-muted-foreground" strokeWidth={1.5} />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for coats, silk, denim…"
        aria-label="Search products"
        className="w-full bg-transparent text-lg placeholder:text-muted-foreground focus:outline-none"
      />
    </form>
  );
}
