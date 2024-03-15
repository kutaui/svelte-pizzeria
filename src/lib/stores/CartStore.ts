import type { CartItem } from "$lib/types/MenuItem";

export function createCartStore() {
  const ls = typeof window !== "undefined" ? window.localStorage : null;

  const storageItems = ls ? localStorage.getItem("cart") ?? "[]" : "[]";

  let cartItems: CartItem[] = JSON.parse(storageItems);

  if (!Array.isArray(cartItems)) {
    cartItems = []; // Ensure cartItems is always an array
  }

  function saveCartProductsToLocalStorage(cartProducts: CartItem[]) {
    if (ls) {
      ls.setItem("cart", JSON.stringify(cartProducts));
    }
  }

  return {
    get cartItems() {
      return cartItems;
    },
    addItem: (item: CartItem, size = null, extras = []) => {
      const cartProduct = { ...item, size, extras };

      cartItems.push(cartProduct);
      saveCartProductsToLocalStorage(cartItems);
    },
    removeItem: (itemId: number) => {
      const index = cartItems.findIndex((item) => item.id === itemId);
      if (index !== -1) {
        cartItems.splice(index, 1);
        saveCartProductsToLocalStorage(cartItems);
      }
    },
    clearCart: () => {
      cartItems.splice(0, cartItems.length);
      saveCartProductsToLocalStorage(cartItems);
    },
  };
}

export const cartStore = createCartStore();