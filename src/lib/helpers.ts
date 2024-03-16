import type { MenuItem, MenuItemPrices } from "$lib/types/MenuItem";


export function parseMenuItemPrices(jsonString: string): MenuItemPrices[] {
  return JSON.parse(jsonString) as MenuItemPrices[];
}

export function cartProductPrice(cartProduct: MenuItem) {
  let price = +cartProduct.base_price;
  if (cartProduct.size) {
    price += +cartProduct.size.price;
  }
  if (cartProduct.extras?.length > 0) {
    for (const extra of cartProduct.extras) {
      price += +extra.price;
    }
  }
  return price;
}