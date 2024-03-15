import { db } from "$lib/db/db.server";
import { sql } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { parseMenuItemPrices } from "$lib/helpers";

export const load: PageServerLoad = async () => {
  const menuItems = await db.execute(
    sql`SELECT *
        FROM menu_items
        ORDER BY created_at ASC`,
  );

  // Print menuItems before parsing
  console.log("Before parsing:", menuItems);

  // for each menu item, parse the sizes and extra ingredient prices
  for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].sizes = typeof menuItems[i].sizes === "string" ? parseMenuItemPrices(menuItems[i].sizes) : [];
    menuItems[i].extra_ingredient_prices = typeof menuItems[i].extra_ingredient_prices === "string" ? parseMenuItemPrices(menuItems[i].extra_ingredient_prices) : [];
  }

  // Print menuItems after parsing
  console.log("After parsing:", menuItems);
  return {
    menuItems,
    categories: await db.execute(
      sql`SELECT *
          FROM categories
          ORDER BY created_at ASC`,
    ),
  };
};

