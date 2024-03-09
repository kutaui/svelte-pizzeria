import type { PageServerLoad } from "./$types";
import { db } from "$lib/db/db.server";
import { sql } from "drizzle-orm";
import { type Actions, redirect } from "@sveltejs/kit";
import { parseMenuItemPrices } from "$lib/helpers";


export const load: PageServerLoad = async ({ params }) => {
  const id = params.id;
  const result = await db.execute(
    sql`SELECT *
          FROM menu_items
          WHERE id = ${id}`,
  );

  const menuItem = {
    ...result[0],
    sizes: typeof result[0].sizes === "string" ? parseMenuItemPrices(result[0].sizes) : [],
    extraIngredientPrices: typeof result[0].extra_ingredient_prices === "string" ? parseMenuItemPrices(result[0].extra_ingredient_prices) : [],
  };

  return {
    categories: await db.execute(
      sql`SELECT *
          FROM categories
          ORDER BY created_at ASC`,
    ),
    menuItem,
  };
};


export const actions = {
  edit: async ({ request, params }) => {
    const id = params.id;
    const data = await request.formData();
    const name = data.get("name") as string;
    const description = data.get("description") as string;
    const categoryID = data.get("category") as string;
    const basePrice = data.get("basePrice") as string;
    const sizesJSON = data.get("sizes") as string;
    const extraIngredientPricesJSON = data.get("extraIngredientPrices") as string;

    if (!name || !description || !categoryID || !basePrice) {
      return { message: "oof", success: false };
    }

    const menuItem = await db.execute(
      sql`SELECT *
          FROM menu_items
          WHERE id = ${id}`,
    );

    if (menuItem.length === 0) {
      return { message: "Menu item not found", success: false };
    }

    const result = await db.execute(
      sql`UPDATE menu_items
          SET name                    = ${name},
              description             = ${description},
              category_id             = ${categoryID},
              base_price              = ${basePrice},
              sizes                   = ${sizesJSON},
              extra_ingredient_prices = ${extraIngredientPricesJSON}
          WHERE id = ${id}`,
    );

    if (result) {
      return { message: "Menu item updated", success: true };
    }
  },
  delete: async ({ params }) => {
    const id = params.id;
    const menuItem = await db.execute(
      sql`SELECT *
          FROM menu_items
          WHERE id = ${id}`,
    );
    if (menuItem.length === 0) {
      return { message: "Menu item not found", success: false };
    }
    const result = await db.execute(
      sql`DELETE
          FROM menu_items
          WHERE id = ${id}`,
    );

    return redirect(300, "/menu-items");
  },
} satisfies Actions;
