# VESTRA — Clothing Storefront (Next.js demo)

A production-shaped frontend for a clothing e-commerce site built with Next.js 16 (App Router),
Tailwind CSS v4 and Zustand. Product data is mocked in `lib/data.ts`; cart and wishlist persist
in localStorage.

## Stack

- **Next.js 16** — App Router, React Server Components, streaming/loading states, ISR-ready routes
- **Tailwind CSS v4** — design tokens as CSS variables (`app/globals.css`)
- **Zustand** — cart, wishlist and UI state (persisted)
- **Hero video** — self-hosted Mixkit clip (`public/videos/hero.mp4`, free Mixkit license), muted/looped/plays-inline with image poster
- **lucide-react** icons, `next/font` (Playfair Display + Inter)

## Pages

| Route | Notes |
|---|---|
| `/` | Autoplaying video hero (poster fallback, reduced-motion aware), category tiles, new-arrivals rail, editorial banner, bestsellers |
| `/collections` | All collections |
| `/collections/[slug]` | PLP — server-side filtering/sorting via URL params (`size`, `color`, `max`, `sort`) |
| `/products/[handle]` | PDP — gallery, color/size selection, add-to-cart, JSON-LD |
| `/search` | Server-filtered search + debounced header overlay (`/api/search`) |
| `/cart`, `/wishlist` | Client state, persisted |
| `/lookbook`, `/lookbook/[slug]` | Editorial pages |
| `/about` | Brand story |

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run lint
npm run build
```

## Frontend plan → implementation mapping

- Server Components by default; client islands for gallery, filters, cart, search, wishlist
- Cart price/stock is authoritative server-side in production — this demo keeps it client-only
- Images: `next/image` with responsive `sizes`, preload only the LCP hero
- Filters/sort are URL-addressable (`/collections/women?size=M&sort=price-asc`)
