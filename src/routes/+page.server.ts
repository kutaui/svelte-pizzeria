import { db } from "$lib/db/db.server";
import type { PageServerLoad } from "./$types";
import { sql } from "drizzle-orm";

export const load = (async () => {
  return {
    menuItems: await db.execute(sql` SELECT * FROM menu_items`),
  };
}) satisfies PageServerLoad;
