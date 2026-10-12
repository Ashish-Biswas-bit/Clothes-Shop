import type { Collection, Lookbook, Product } from "./types";

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const heroImage = img("photo-1490481651871-ab68de25d43d", 2000);

const INK = { name: "Ink", hex: "#17140f" };
const IVORY = { name: "Ivory", hex: "#f2ede3" };
const CLAY = { name: "Clay", hex: "#9a6b45" };
const SAGE = { name: "Sage", hex: "#8a9179" };
const CHARCOAL = { name: "Charcoal", hex: "#3c3a36" };
const CAMEL = { name: "Camel", hex: "#b98d5e" };
const INDIGO = { name: "Indigo", hex: "#39435c" };

export const products: Product[] = [
  {
    id: "p1",
    handle: "silk-slip-dress",
    title: "Bias-Cut Silk Slip Dress",
    category: "women",
    price: 289,
    colors: [INK, IVORY],
    sizes: ["XS", "S", "M", "L"],
    images: [
      img("photo-1595777457583-95e059d581b8"),
      img("photo-1496747611176-843222e1e57c"),
      img("photo-1515886657613-9f3515b0c78f"),
    ],
    description:
      "A fluid, bias-cut silhouette in washed silk that skims the body and moves with it. Designed to be worn from afternoon to evening.",
    details: ["100% washed silk", "Bias cut, fully lined", "Adjustable straps", "Dry clean only"],
    badge: "new",
    isNew: true,
    rating: 4.8,
    reviewCount: 126,
  },
  {
    id: "p2",
    handle: "oversized-wool-coat",
    title: "Oversized Wool Coat",
    category: "women",
    price: 545,
    compareAtPrice: 690,
    colors: [CAMEL, CHARCOAL],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      img("photo-1520975954732-35dd22299614"),
      img("photo-1539109136881-3be0616acf4b"),
      img("photo-1469334031218-e382a71b716b"),
    ],
    description:
      "An enveloping double-faced wool coat with dropped shoulders and a generous lapel. The one coat you will reach for every cold morning.",
    details: ["80% wool, 20% polyamide", "Double-faced, unlined", "Side welt pockets", "Professional clean"],
    badge: "sale",
    rating: 4.9,
    reviewCount: 84,
  },
  {
    id: "p3",
    handle: "ribbed-merino-sweater",
    title: "Ribbed Merino Sweater",
    category: "women",
    price: 168,
    colors: [IVORY, SAGE, INK],
    sizes: ["XS", "S", "M", "L"],
    images: [
      img("photo-1576566588028-4147f3842f27"),
      img("photo-1487222477894-8943e31ef7b2"),
    ],
    description:
      "Fine-gauge merino ribbed for texture and stretch. Warm without weight, and cut slightly long through the body.",
    details: ["100% extra-fine merino wool", "Ribbed knit", "Machine wash cold, lay flat to dry"],
    badge: "bestseller",
    rating: 4.7,
    reviewCount: 213,
  },
  {
    id: "p4",
    handle: "wide-leg-linen-trouser",
    title: "Wide-Leg Linen Trouser",
    category: "women",
    price: 195,
    colors: [IVORY, CLAY],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      img("photo-1483985988355-763728e1935b"),
      img("photo-1509631179647-0177331693ae"),
    ],
    description:
      "High-waisted and fluid through the leg in a substantial European linen that softens with every wear.",
    details: ["100% European linen", "High rise, wide leg", "Side zip closure", "Machine wash cold"],
    isNew: true,
    rating: 4.6,
    reviewCount: 58,
  },
  {
    id: "p5",
    handle: "everyday-tee",
    title: "Heavyweight Everyday Tee",
    category: "women",
    price: 68,
    colors: [IVORY, INK, SAGE],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      img("photo-1521572163474-6864f9cf17ab"),
      img("photo-1618354691373-d851c5c3a990"),
    ],
    description:
      "The tee, perfected. A dense organic cotton jersey with a structured collar that keeps its shape wash after wash.",
    details: ["100% organic cotton, 220gsm", "Twin-needle hems", "Pre-shrunk"],
    badge: "bestseller",
    rating: 4.8,
    reviewCount: 402,
  },
  {
    id: "p6",
    handle: "structured-blazer",
    title: "Structured Linen Blazer",
    category: "women",
    price: 320,
    colors: [CHARCOAL, IVORY],
    sizes: ["XS", "S", "M", "L"],
    images: [
      img("photo-1551028719-00167b16eac5"),
      img("photo-1445205170230-053b83016050"),
    ],
    description:
      "A softly tailored blazer in linen hopsack. Lightly structured through the shoulder with a single-button closure.",
    details: ["Linen hopsack, cotton lining", "Single button", "Back vent"],
    isNew: true,
    rating: 4.5,
    reviewCount: 41,
  },
  {
    id: "p7",
    handle: "relaxed-oxford-shirt",
    title: "Relaxed Oxford Shirt",
    category: "men",
    price: 115,
    colors: [INDIGO, IVORY],
    sizes: ["S", "M", "L", "XL"],
    images: [
      img("photo-1554568218-0f1715e72254"),
      img("photo-1583743814966-8936f5b7be1a"),
    ],
    description:
      "A garment-dyed oxford with a relaxed collar and slightly curved hem. Wear it buttoned or open over a tee.",
    details: ["100% cotton oxford", "Garment-dyed", "Machine wash warm"],
    badge: "bestseller",
    rating: 4.7,
    reviewCount: 189,
  },
  {
    id: "p8",
    handle: "tailored-wool-suit",
    title: "Tailored Wool Suit Jacket",
    category: "men",
    price: 620,
    colors: [CHARCOAL, INK],
    sizes: ["S", "M", "L", "XL"],
    images: [
      img("photo-1552374196-1ab2a1c593e8"),
      img("photo-1507003211169-0a1dd7228f2d"),
    ],
    description:
      "Half-canvassed and cut from Italian merino with a natural shoulder. Tailoring that travels well.",
    details: ["Italian merino wool", "Half-canvassed construction", "Functional cuffs", "Dry clean only"],
    rating: 4.9,
    reviewCount: 67,
  },
  {
    id: "p9",
    handle: "brushed-hoodie",
    title: "Brushed Cotton Hoodie",
    category: "men",
    price: 145,
    compareAtPrice: 180,
    colors: [CHARCOAL, SAGE, INK],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      img("photo-1620799140408-edc6dcb6d633"),
      img("photo-1556821840-3a63f95609a7"),
    ],
    description:
      "Heavyweight loopback cotton, brushed inside for warmth. Dropped shoulders, ribbed cuffs, no logo anywhere.",
    details: ["400gsm loopback cotton", "Brushed interior", "Machine wash cold"],
    badge: "sale",
    rating: 4.6,
    reviewCount: 156,
  },
  {
    id: "p10",
    handle: "selvedge-denim-jean",
    title: "Selvedge Denim Jean",
    category: "men",
    price: 210,
    colors: [INDIGO, INK],
    sizes: ["28", "30", "32", "34", "36"],
    images: [
      img("photo-1542272604-787c3835535d"),
      img("photo-1541099649105-f69ad21f3246"),
    ],
    description:
      "Raw Japanese selvedge denim in a straight, mid-rise cut. It fades to your life within a few months.",
    details: ["14oz Japanese selvedge denim", "Straight leg, mid rise", "Button fly", "Made in Japan"],
    badge: "new",
    isNew: true,
    rating: 4.8,
    reviewCount: 92,
  },
  {
    id: "p11",
    handle: "field-jacket",
    title: "Waxed Cotton Field Jacket",
    category: "men",
    price: 385,
    colors: [SAGE, CAMEL],
    sizes: ["S", "M", "L", "XL"],
    images: [
      img("photo-1503341504253-dff4815485f1"),
      img("photo-1434389677669-e08b4cac3105"),
    ],
    description:
      "A four-pocket field jacket in British waxed cotton that only gets better as the patina builds.",
    details: ["British waxed cotton", "Four bellows pockets", "Storm cuffs"],
    rating: 4.7,
    reviewCount: 74,
  },
  {
    id: "p12",
    handle: "leather-tote",
    title: "Vegetable-Tanned Leather Tote",
    category: "accessories",
    price: 340,
    colors: [CAMEL, INK],
    sizes: ["ONE SIZE"],
    images: [
      img("photo-1584917865442-de89df76afd3"),
      img("photo-1548036328-c9fa89d128fa"),
    ],
    description:
      "A structured everyday tote in vegetable-tanned leather with an interior zip pocket and solid brass hardware.",
    details: ["Vegetable-tanned full-grain leather", "Solid brass hardware", "Unlined interior", "Made in Italy"],
    badge: "bestseller",
    rating: 4.9,
    reviewCount: 231,
  },
  {
    id: "p13",
    handle: "acetate-sunglasses",
    title: "Handmade Acetate Sunglasses",
    category: "accessories",
    price: 155,
    compareAtPrice: 195,
    colors: [INK, CLAY],
    sizes: ["ONE SIZE"],
    images: [
      img("photo-1511499767150-a48a237f0083"),
    ],
    description:
      "Italian acetate frames with polarized lenses, hand-polished over three days for a glass-like finish.",
    details: ["Italian acetate", "Polarized CR-39 lenses", "UV400 protection", "Leather case included"],
    badge: "sale",
    rating: 4.5,
    reviewCount: 48,
  },
  {
    id: "p14",
    handle: "minimal-wristwatch",
    title: "Minimalist Steel Wristwatch",
    category: "accessories",
    price: 265,
    colors: [INK, CAMEL],
    sizes: ["ONE SIZE"],
    images: [
      img("photo-1523170335258-f5ed11844a49"),
    ],
    description:
      "A 38mm brushed steel case, sapphire crystal and a quiet dial. Swiss quartz movement, interchangeable straps.",
    details: ["38mm brushed steel case", "Sapphire crystal", "Swiss quartz movement", "2-year warranty"],
    isNew: true,
    rating: 4.6,
    reviewCount: 39,
  },
  {
    id: "p15",
    handle: "low-top-sneakers",
    title: "Italian Leather Low-Tops",
    category: "accessories",
    price: 230,
    colors: [IVORY, INK],
    sizes: ["36", "38", "40", "42", "44"],
    images: [
      img("photo-1549298916-b41d501d3772"),
      img("photo-1560769629-975ec94e6a86"),
    ],
    description:
      "Clean low-tops in full-grain leather on a cupsole with a cork-blend footbed that molds to you.",
    details: ["Full-grain leather upper", "Cork-blend footbed", "Rubber cupsole", "Made in Portugal"],
    badge: "bestseller",
    rating: 4.7,
    reviewCount: 316,
  },
  {
    id: "p16",
    handle: "cashmere-scarf",
    title: "Brushed Cashmere Scarf",
    category: "accessories",
    price: 145,
    colors: [CLAY, IVORY, CHARCOAL],
    sizes: ["ONE SIZE"],
    images: [
      img("photo-1523381210434-271e8be1f52b"),
    ],
    description:
      "A generously sized cashmere scarf, brushed for a soft halo and finished with hand-knotted fringe.",
    details: ["100% Mongolian cashmere", "200 × 70 cm", "Hand-knotted fringe", "Hand wash cold"],
    isNew: true,
    rating: 4.8,
    reviewCount: 87,
  },
];

export const collections: Collection[] = [
  {
    slug: "new-arrivals",
    title: "New Arrivals",
    subtitle: "The latest pieces",
    description: "Freshly added silhouettes, fabrics and finishes for the season ahead.",
    image: img("photo-1441986300917-64674bd600d8"),
    filter: (p) => Boolean(p.isNew),
  },
  {
    slug: "women",
    title: "Women",
    subtitle: "Soft tailoring & silk",
    description: "Considered essentials in natural fabrics — designed to be worn together, for years.",
    image: img("photo-1490481651871-ab68de25d43d"),
    filter: (p) => p.category === "women",
  },
  {
    slug: "men",
    title: "Men",
    subtitle: "Quiet staples",
    description: "Relaxed tailoring, heavyweight jersey and denim that ages well.",
    image: img("photo-1552374196-1ab2a1c593e8"),
    filter: (p) => p.category === "men",
  },
  {
    slug: "accessories",
    title: "Accessories",
    subtitle: "Finishing touches",
    description: "Leather goods, eyewear and small objects made by specialist workshops.",
    image: img("photo-1584917865442-de89df76afd3"),
    filter: (p) => p.category === "accessories",
  },
  {
    slug: "bestsellers",
    title: "Bestsellers",
    subtitle: "Most loved",
    description: "The pieces our customers return to, season after season.",
    image: img("photo-1483985988355-763728e1935b"),
    filter: (p) => p.badge === "bestseller",
  },
];

export const lookbooks: Lookbook[] = [
  {
    slug: "autumn-winter-26",
    title: "Autumn / Winter 2026",
    season: "Campaign",
    cover: img("photo-1490481651871-ab68de25d43d"),
    intro:
      "A study in restraint. Double-faced wool, washed silk and raw denim photographed on the coast at first light — clothing that asks for nothing and gives back quietly.",
    sections: [
      { image: img("photo-1515886657613-9f3515b0c78f", 1600), caption: "The Bias Slip in ink, layered under the oversized wool coat." },
      { image: img("photo-1520975954732-35dd22299614", 1600), caption: "Double-faced wool, cut generously and left unlined." },
      { image: img("photo-1509631179647-0177331693ae", 1600), caption: "Linen that softens with every wear." },
    ],
  },
  {
    slug: "the-denim-story",
    title: "The Denim Story",
    season: "Editorial",
    cover: img("photo-1542272604-787c3835535d"),
    intro:
      "Six months with a single pair of raw Japanese selvedge — how a rigid fabric learns the shape of a life.",
    sections: [
      { image: img("photo-1541099649105-f69ad21f3246", 1600), caption: "Day one: rigid, indigo, unwashed." },
      { image: img("photo-1434389677669-e08b4cac3105", 1600), caption: "Month four: the first fades appear at the hip." },
    ],
  },
  {
    slug: "atelier-notes",
    title: "Atelier Notes",
    season: "Behind the seams",
    cover: img("photo-1523381210434-271e8be1f52b"),
    intro:
      "Inside the workshops where our clothes are made — the people, the machines and the slow parts no one sees.",
    sections: [
      { image: img("photo-1441986300917-64674bd600d8", 1600), caption: "The cutting table, early morning." },
      { image: img("photo-1548036328-c9fa89d128fa", 1600), caption: "Vegetable-tanned leather, aged three weeks before cutting." },
    ],
  },
];

export function getProduct(handle: string) {
  return products.find((p) => p.handle === handle);
}

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}

export function getCollectionProducts(slug: string) {
  const collection = getCollection(slug);
  if (!collection) return [];
  return products.filter(collection.filter);
}

export function getRelatedProducts(product: Product, count = 4) {
  const sameCategory = products.filter((p) => p.category === product.category && p.id !== product.id);
  const rest = products.filter((p) => p.category !== product.category && p.id !== product.id);
  return [...sameCategory, ...rest].slice(0, count);
}

export function searchProducts(query: string, limit?: number) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const matches = products.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.colors.some((c) => c.name.toLowerCase().includes(q)),
  );
  return limit ? matches.slice(0, limit) : matches;
}
