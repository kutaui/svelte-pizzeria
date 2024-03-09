import type { PageServerLoad } from "./$types";
import { db } from "$lib/db/db.server";
import { eq, sql } from "drizzle-orm";
import { users } from "$lib/db/schema";
import { type Actions, fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
  const { user: existingUser } = locals;
  if (!existingUser) throw new Error("User not found");
  const res = await db
    .select()
    .from(users)
    .where(eq(users.id, existingUser.id ?? 0));
  const { password, ...result } = res[0];
  return {
    result,
  };
};

export const actions = {
  profile: async ({ request, locals }) => {
    const { user: existingUser } = locals;
    if (!existingUser) {
      return fail(400, { error: "User not found." });
    }
    const data = await request.formData();
    const name = data.get("name") as string;
    const address = data.get("address") as string;
    const postal = data.get("postal") as string;
    const city = data.get("city") as string;
    const country = data.get("country") as string;
    const telephone = data.get("telephone") as string;

    await db.execute(sql`
        UPDATE "users"
        SET name           = NULLIF(${name}, ''),
            street_address = NULLIF(${address}, ''),
            postal_code    = NULLIF(${postal}, ''),
            city           = NULLIF(${city}, ''),
            country        = NULLIF(${country}, ''),
            phone          = NULLIF(${telephone}, '')
        WHERE "users".email = ${existingUser.email}
    `);

    return { success: true };
  },
  image: async ({ request }) => {
  },
} satisfies Actions;
