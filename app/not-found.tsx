import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-5 px-4 text-center">
      <p className="eyebrow">404</p>
      <h1 className="font-display text-4xl italic md:text-5xl">This page has slipped out of stock</h1>
      <p className="text-sm text-muted-foreground">
        The page you are looking for does not exist — or it never did. Let’s get you back to the good stuff.
      </p>
      <Link href="/" className="btn-primary">
        Back to home
      </Link>
    </div>
  );
}
