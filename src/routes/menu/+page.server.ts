import { db } from "$lib/db/db.server";
import { sql } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { parseMenuItemPrices } from "$lib/helpers";

export const load: PageServerLoad = async () => {
  const menuItems = await db.execute(
    sql`SELECT *
        FROM menu_items
        ORDER BY created_at ASC`
  );

  for (let i = 0; i < menuItems.length; i++) {
    // @ts-expect-error its 2024 typescript wake up
    menuItems[i].sizes =
      typeof menuItems[i].sizes === "string"
        ? parseMenuItemPrices(menuItems[i].sizes)
        : [];
    // @ts-expect-error its 2024 typescript wake up
    menuItems[i].extra_ingredient_prices =
      typeof menuItems[i].extra_ingredient_prices === "string"
        ? parseMenuItemPrices(menuItems[i].extra_ingredient_prices)
        : [];
  }

  return {
    menuItems,
    categories: await db.execute(
      sql`SELECT *
          FROM categories
          ORDER BY created_at ASC`
    ),
  };
};
