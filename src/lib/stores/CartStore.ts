import type { CartItem } from "$lib/types/MenuItem";

export function createCartStore() {
  const storageItems = typeof window !== "undefined" ? localStorage.getItem("cart") ?? "[]" : "[]";


  const items: CartItem[] = JSON.parse(storageItems);
  return {
    get items() {
      return items;
    },
    addItem: (item: CartItem) => {
      items.push(item);
      if (typeof window !== "undefined") localStorage.setItem("cart", JSON.stringify(items));
    },
  };
}


export const cartStore = createCartStore();