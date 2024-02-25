import { db } from "$lib/db/db.server";
import { users } from "$lib/db/schema";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  const result = await db.select().from(users);
  return {
    result,
  };
}) satisfies PageServerLoad;
