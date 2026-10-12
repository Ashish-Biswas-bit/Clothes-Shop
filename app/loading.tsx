export default function Loading() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 py-12 md:px-8" aria-busy="true" aria-label="Loading">
      <div className="h-10 w-64 animate-pulse bg-muted" />
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-[3/4] animate-pulse bg-muted" />
        ))}
      </div>
    </div>
  );
}
