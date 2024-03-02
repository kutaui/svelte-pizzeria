import type { MenuItemPrices } from "$lib/types/MenuItem";


export function parseMenuItemPrices(jsonString: string): MenuItemPrices[] {
  return JSON.parse(jsonString) as MenuItemPrices[];
}
