import type { PageServerLoad } from "../../../.svelte-kit/types/src/routes/profile/$types";
import { db } from "$lib/db/db.server";
import { eq, sql } from "drizzle-orm";
import { type Actions, fail, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
  return {
    categories: await db.execute(
      sql`SELECT *
          FROM categories
          ORDER BY created_at ASC`,
    ),
  };
};

export const actions = {
  categories: async ({ request, cookies }) => {
    const data = await request.formData();

    const categoryName = data.get("categoryName") as string;
    const update = data.get("update");
    const categoryIdValue = data.get("categoryId");
    if (!categoryName.trim()) {
      return { message: "Category name is required", success: false };
    }
    let categoryId: number | null;
    if (typeof categoryIdValue === "string") {
      categoryId =
        categoryIdValue !== null ? parseInt(categoryIdValue, 10) : null;
    }

    const categories = await db.execute(
      sql`SELECT *
          FROM categories`,
    );
    const category = categories.find((category) => category.id === categoryId);

    if (update == "false") {
      const newCategory = await db.execute(sql`INSERT INTO categories (name)
                                               VALUES (${categoryName})`);

      return { message: "Category added", success: true };

      // @ts-expect-error I have no idea
    } else if (category && categoryId !== null) {
      console.log("not here");

      const updatedCategory = await db.execute(sql`UPDATE categories
                                                   SET name = ${categoryName}
                                                   WHERE id = ${category.id}`);
      return { message: "Category updated", success: true };
    } else {
      console.log("Invalid data for update");
      return { message: "Invalid data for update", success: false };

    }
  },
  deleteCategory: async ({ request }) => {
    const data = await request.formData();
    const categoryID = data.get("deleteID");
    console.log(data);
    const category = await db.execute(
      sql`SELECT *
          FROM categories
          WHERE id = ${categoryID}`,
    );
    if (category.length <= 0) {
      return { message: "Category not found", success: false };
    }

    const deletedCategory = await db.execute(sql`DELETE
                                                 FROM categories
                                                 WHERE id = ${categoryID}`);

    return { message: "Category deleted", success: true };
  },
} satisfies Actions;
