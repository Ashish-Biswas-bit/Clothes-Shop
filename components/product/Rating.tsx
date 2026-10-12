import { Star } from "lucide-react";

export default function Rating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  return (
    <div className="flex items-center gap-2" aria-label={`Rated ${rating} out of 5 from ${reviewCount} reviews`}>
      <div className="flex" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${i < Math.round(rating) ? "fill-foreground text-foreground" : "text-border"}`}
            strokeWidth={1.5}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">
        {rating} ({reviewCount})
      </span>
    </div>
  );
}
