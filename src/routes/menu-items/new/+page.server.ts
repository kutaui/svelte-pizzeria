import type { PageServerLoad } from "./$types";
import { db } from "$lib/db/db.server";
import { sql } from "drizzle-orm";
import { type Actions, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
  return {
    categories: await db.execute(
      sql`SELECT *
          FROM categories
          ORDER BY created_at ASC`,
    ),
  };
};

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    const name = data.get("name") as string;
    const description = data.get("description") as string;
    const categoryID = data.get("category") as string;
    const basePrice = data.get("basePrice") as string;
    const sizesJSON = data.get("sizes") as string;
    const image = data.get("image") as File;
    const extraIngredientPricesJSON = data.get(
      "extraIngredientPrices",
    ) as string;
    const basePriceNumber = +basePrice;

    if (!name || !description || !categoryID || !basePrice) {
      return { message: "oof", success: false };
    }
    const menuItem = await db.execute(sql`
      INSERT INTO menu_items (name, description, category_id, base_price, sizes, extra_ingredient_prices, image)
      VALUES (${name}, ${description}, ${categoryID}, ${basePriceNumber}, ${sizesJSON}, ${extraIngredientPricesJSON}, ${image})
    `);

    return redirect(300, `/menu-items`);
  },
} satisfies Actions;
