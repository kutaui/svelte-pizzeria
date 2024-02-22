import type { PageServerLoad } from "./$types";
import { db } from "$lib/db/db.server";
import { eq } from "drizzle-orm";
import { user } from "$lib/db/schema";

export const load: PageServerLoad = async ({ locals }) => {
  const { user: existingUser } = locals;
  if (!existingUser) throw new Error("User not found");
  const result = await db
    .select()
    .from(user)
    .where(eq(user.id, existingUser.id));
  return {
    result,
  };
};
