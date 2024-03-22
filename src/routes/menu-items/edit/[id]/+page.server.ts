import type { PageServerLoad } from "./$types";
import { db } from "$lib/db/db.server";
import { sql } from "drizzle-orm";
import { type Actions, redirect } from "@sveltejs/kit";
import { parseMenuItemPrices } from "$lib/helpers";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { MY_AWS_ACCESS_KEY, MY_AWS_SECRET_KEY } from "$env/static/private";

export const load: PageServerLoad = async ({ params }) => {
  const id = params.id;
  const result = await db.execute(
    sql`SELECT *
          FROM menu_items
          WHERE id = ${id}`,
  );

  const menuItem = {
    ...result[0],
    sizes:
      typeof result[0].sizes === "string"
        ? parseMenuItemPrices(result[0].sizes)
        : [],
    extraIngredientPrices:
      typeof result[0].extra_ingredient_prices === "string"
        ? parseMenuItemPrices(result[0].extra_ingredient_prices)
        : [],
  };

  return {
    categories: await db.execute(
      sql`SELECT *
          FROM categories
          ORDER BY created_at ASC`,
    ),
    menuItem,
  };
};

export const actions = {
  edit: async ({ request, params }) => {
    const id = params.id;
    const data = await request.formData();
    const name = data.get("name") as string;
    const description = data.get("description") as string;
    const categoryID = data.get("category") as string;
    const basePrice = data.get("basePrice") as string;
    const sizesJSON = data.get("sizes") as string;
    const image = data.get("image") as File;
    const extraIngredientPricesJSON = data.get(
      "extraIngredientPrices",
    ) as string;
    const basePriceNumber = +basePrice;

    if (!name || !description || !categoryID || !basePrice) {
      return { message: "oof", success: false };
    }

    const menuItem = await db.execute(
      sql`SELECT *
          FROM menu_items
          WHERE id = ${id}`,
    );

    if (menuItem.length === 0) {
      return { message: "Menu item not found", success: false };
    }

    const s3Client = new S3Client({
      region: "eu-central-1",
      credentials: {
        accessKeyId: MY_AWS_ACCESS_KEY,
        secretAccessKey: MY_AWS_SECRET_KEY,
      },
    });


    const chunks = [];

    for await (const chunk of image.stream()) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    const uploadedFile = await s3Client.send(new PutObjectCommand({
      Bucket: "svelte-pizzeria-bucket",
      Key: `product/${name}`,
      ACL: "public-read",
      ContentType: image.type,
      Body: buffer,
    }));
    if (image && uploadedFile["$metadata"].httpStatusCode === 200) {
      const imageUrl = `https://svelte-pizzeria-bucket.s3.eu-central-1.amazonaws.com/product/${name}?t=${Date.now()}`;
      const result = await db.execute(
        sql`UPDATE menu_items
            SET name                    = ${name},
                description             = ${description},
                category_id             = ${categoryID},
                base_price              = ${basePriceNumber},
                sizes                   = ${sizesJSON},
                extra_ingredient_prices = ${extraIngredientPricesJSON},
                image                   = ${imageUrl}
            WHERE id = ${id}`,
      );
      return redirect(300, `/menu-items`);

    } else {
      const result = await db.execute(
        sql`UPDATE menu_items
            SET name                    = ${name},
                description             = ${description},
                category_id             = ${categoryID},
                base_price              = ${basePriceNumber},
                sizes                   = ${sizesJSON},
                extra_ingredient_prices = ${extraIngredientPricesJSON},
                WHERE id = ${id}`,
      );
      return redirect(300, `/menu-items`);

    }


  },
  delete: async ({ params }) => {
    const id = params.id;
    const menuItem = await db.execute(
      sql`SELECT *
          FROM menu_items
          WHERE id = ${id}`,
    );
    if (menuItem.length === 0) {
      return { message: "Menu item not found", success: false };
    }
    const result = await db.execute(
      sql`DELETE
          FROM menu_items
          WHERE id = ${id}`,
    );

    return redirect(301, "/menu-items");
  },
} satisfies Actions;
