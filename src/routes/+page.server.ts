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

  for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].sizes =
      typeof menuItems[i].sizes === "string"
        // @ts-expect-error its 2024 typescript wake up
        ? parseMenuItemPrices(menuItems[i].sizes)
        : [];
    menuItems[i].extra_ingredient_prices =
      typeof menuItems[i].extra_ingredient_prices === "string"
        // @ts-expect-error its 2024 typescript wake up
        ? parseMenuItemPrices(menuItems[i].extra_ingredient_prices)
        : [];
  }

  return {
    menuItems,
    categories: await db.execute(
      sql`SELECT *
          FROM categories
          ORDER BY created_at ASC`,
    ),
  };
};
