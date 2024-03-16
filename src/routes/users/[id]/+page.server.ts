import type { PageServerLoad } from "./$types";
import { db } from "$lib/db/db.server";
import { sql } from "drizzle-orm";
import { type Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params, locals }) => {
  const { user: currentUser } = locals;

  const id = params.id;
  const result = await db.execute(
    sql`SELECT *
          FROM users
          WHERE id = ${id}`,
  );
  return {
    user: result[0],
    currentUser,
  };
};


export const actions = {
  edit: async ({ request, params }) => {
    const id = params.id;
    const data = await request.formData();
    const name = data.get("name") as string;
    const address = data.get("address") as string;
    const postal = data.get("postal") as string;
    const city = data.get("city") as string;
    const country = data.get("country") as string;
    const telephone = data.get("telephone") as string;
    console.log(data);

    await db.execute(
      sql`UPDATE "users"
          SET name           = NULLIF(${name}, ''),
              street_address = NULLIF(${address}, ''),
              postal_code    = NULLIF(${postal}, ''),
              city           = NULLIF(${city}, ''),
              country        = NULLIF(${country}, ''),
              phone          = NULLIF(${telephone}, '')
          WHERE id = ${id}`,
    );


    return { message: "Menu item updated", success: true };
  },
} satisfies Actions;
