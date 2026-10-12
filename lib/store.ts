import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  key: string;
  handle: string;
  title: string;
  image: string;
  price: number;
  color: string;
  size: string;
  qty: number;
};

type AddToCartInput = Omit<CartItem, "key" | "qty"> & { qty?: number };

type CartState = {
  items: CartItem[];
  add: (input: AddToCartInput) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (input) =>
        set((state) => {
          const key = `${input.handle}|${input.color}|${input.size}`;
          const existing = state.items.find((item) => item.key === key);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.key === key ? { ...item, qty: item.qty + (input.qty ?? 1) } : item,
              ),
            };
          }
          return { items: [...state.items, { ...input, key, qty: input.qty ?? 1 }] };
        }),
      remove: (key) => set((state) => ({ items: state.items.filter((item) => item.key !== key) })),
      setQty: (key, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((item) => item.key !== key)
              : state.items.map((item) => (item.key === key ? { ...item, qty } : item)),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "vestra-cart" },
  ),
);

export function cartCount(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.qty, 0);
}

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

type WishlistState = {
  ids: string[];
  toggle: (id: string) => void;
};

export const useWishlist = create<WishlistState>()(
  persist(
    (set) => ({
      ids: [],
      toggle: (id) =>
        set((state) => ({
          ids: state.ids.includes(id) ? state.ids.filter((x) => x !== id) : [...state.ids, id],
        })),
    }),
    { name: "vestra-wishlist" },
  ),
);

type UiState = {
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
};

export const useUi = create<UiState>((set) => ({
  cartOpen: false,
  setCartOpen: (cartOpen) => set({ cartOpen }),
  mobileNavOpen: false,
  setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen }),
  searchOpen: false,
  setSearchOpen: (searchOpen) => set({ searchOpen }),
}));
