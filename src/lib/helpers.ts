import type { MenuItem, MenuItemPrices } from "$lib/types/MenuItem";


export function parseMenuItemPrices(jsonString: string): MenuItemPrices[] {
  return JSON.parse(jsonString) as MenuItemPrices[];
}

export function cartProductPrice(cartProduct: MenuItem) {
  let price = cartProduct.base_price;
  if (cartProduct.sizes) {
    price += cartProduct.sizes.price;
  }
  if (cartProduct.extra_ingredient_prices?.length > 0) {
    for (const extra of cartProduct.extra_ingredient_prices) {
      price += extra.price;
    }
  }
  return price;
}