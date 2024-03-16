import type { CartItem, MenuItemPrices } from "$lib/types/MenuItem";

export function createCartStore() {
  const ls = typeof window !== "undefined" ? window.localStorage : null;

  const storageItems = ls ? localStorage.getItem("cart") ?? "[]" : "[]";

  let cartItems: CartItem[] = $state(JSON.parse(storageItems));

  if (!Array.isArray(cartItems)) {
    cartItems = [];
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
    addItem: (
      item: CartItem,
      size: MenuItemPrices | undefined = undefined,
      extras: MenuItemPrices[] | [] = []
    ) => {
      const cartProduct = { ...item, size, extras };

      cartItems.push(cartProduct);
      saveCartProductsToLocalStorage(cartItems);
    },
    removeItem: (itemId: number | undefined) => {
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

// typescript go brrr
function ore() {
  throw new Error("Function not implemented.");
}
