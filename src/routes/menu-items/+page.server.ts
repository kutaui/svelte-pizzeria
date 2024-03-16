import { db } from "$lib/db/db.server";
import { sql } from "drizzle-orm";
import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { parseMenuItemPrices } from "$lib/helpers";

export const load: PageServerLoad = async () => {
  return {
    menuItems: await db.execute(
      sql`SELECT *
          FROM menu_items
          ORDER BY created_at ASC`
    ),
  };
};
