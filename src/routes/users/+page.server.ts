import type { PageServerLoad } from "../../../.svelte-kit/types/src/routes/profile/$types";
import { db } from "$lib/db/db.server";
import { sql } from "drizzle-orm";

export const load: PageServerLoad = async () => {
  return {
    users: await db.execute(
      sql`SELECT *
          FROM users
          ORDER BY created_at ASC`,
    ),
  };
};
