export type ProductColor = { name: string; hex: string };

export type Product = {
  id: string;
  handle: string;
  title: string;
  category: "women" | "men" | "accessories";
  price: number;
  compareAtPrice?: number;
  colors: ProductColor[];
  sizes: string[];
  images: string[];
  description: string;
  details: string[];
  badge?: "new" | "sale" | "bestseller";
  isNew?: boolean;
  rating: number;
  reviewCount: number;
};

export type Collection = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  filter: (p: Product) => boolean;
};

export type LookbookSection = {
  image: string;
  caption: string;
};

export type Lookbook = {
  slug: string;
  title: string;
  season: string;
  cover: string;
  intro: string;
  sections: LookbookSection[];
};
