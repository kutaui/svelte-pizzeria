import { db } from "$lib/db/db.server";
import { users } from "$lib/db/schema";
import type { PageServerLoad } from "./$types";
import { sql } from "drizzle-orm";

export const load = (async () => {
  return {
    menuItems: await db.execute(sql` SELECT * FROM menu_items`),
  };
}) satisfies PageServerLoad;
