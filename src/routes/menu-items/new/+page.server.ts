import type { PageServerLoad } from "./$types";
import { db } from "$lib/db/db.server";
import { sql } from "drizzle-orm";
import { type Actions, redirect } from "@sveltejs/kit";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { AWS_ACCESS_KEY, AWS_SECRET_KEY } from "$env/static/private";

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
  create: async ({ request }) => {
    const data = await request.formData();
    const name = data.get("name") as string;
    const description = data.get("description") as string;
    const categoryID = data.get("category") as string;
    const basePrice = data.get("basePrice") as string;
    const sizesJSON = data.get("sizes") as string;
    const image = data.get("image") as Blob;
    const extraIngredientPricesJSON = data.get(
      "extraIngredientPrices",
    ) as string;
    console.log(data);
    console.log(image);
    const basePriceNumber = +basePrice;

    if (!name || !description || !categoryID || !basePrice) {
      return { error: "All fields are required.", success: false };
    }

    const s3Client = new S3Client({
      region: "eu-central-1",
      credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY,
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
      const menuItem = await db.execute(sql`
      INSERT INTO menu_items (name, description, category_id, base_price, sizes, extra_ingredient_prices, image)
      VALUES (${name}, ${description}, ${categoryID}, ${basePriceNumber}, ${sizesJSON}, ${extraIngredientPricesJSON}, ${imageUrl})
    `);
      return redirect(300, `/menu-items`);

    } else {
      const menuItem = await db.execute(sql`
      INSERT INTO menu_items (name, description, category_id, base_price, sizes, extra_ingredient_prices)
      VALUES (${name}, ${description}, ${categoryID}, ${basePriceNumber}, ${sizesJSON}, ${extraIngredientPricesJSON})
    `);
      return redirect(300, `/menu-items`);

    }


  }
  ,
} satisfies Actions;
