import { db } from "$lib/db/db.server";
import type { PageServerLoad } from "./$types";
import { sql } from "drizzle-orm";

export const load: PageServerLoad = async () => {
  return {
    orders: await db.execute(
      sql`SELECT *
          FROM orders
          ORDER BY created_at ASC`
    ),
  };
};
