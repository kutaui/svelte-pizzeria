import { db } from "$lib/db/db.server";
import { user } from "$lib/db/schema";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  const result = await db.select().from(user);
  return {
    result,
  };
}) satisfies PageServerLoad;
