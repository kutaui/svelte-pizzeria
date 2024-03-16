import { db } from "$lib/db/db.server";
import { sql } from "drizzle-orm";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return {
    menuItems: await db.execute(
      sql`SELECT *
          FROM menu_items
          ORDER BY created_at ASC`,
    ),
  };
};
