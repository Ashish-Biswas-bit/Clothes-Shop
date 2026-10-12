import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SectionHeader({
  eyebrow,
  title,
  href,
  linkLabel = "View all",
}: {
  eyebrow: string;
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6">
      <div>
        <p className="eyebrow mb-2">{eyebrow}</p>
        <h2 className="font-display text-3xl md:text-4xl">{title}</h2>
      </div>
      {href && (
        <Link
          href={href}
          className="group hidden items-center gap-2 text-[11px] uppercase tracking-[0.2em] hover:opacity-70 sm:flex"
        >
          {linkLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
        </Link>
      )}
    </div>
  );
}
