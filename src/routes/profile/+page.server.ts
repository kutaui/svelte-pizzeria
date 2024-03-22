import type { PageServerLoad } from "./$types";
import { db } from "$lib/db/db.server";
import { eq, sql } from "drizzle-orm";
import { users } from "$lib/db/schema";
import { type Actions, fail } from "@sveltejs/kit";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { MY_AWS_ACCESS_KEY, MY_AWS_SECRET_KEY } from "$env/static/private";

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
    const data = await request.formData();
    const image = data.get("image") as Blob;
    const userId = data.get("userId") as string;

    // check for file extension, it should be jpg, jpeg or png or gif
    const allowedExtensions = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
    if (!allowedExtensions.includes(image.type)) {
      return fail(400, { error: "Invalid image type." });
    }

    if (!userId) {
      return fail(400, { error: "User not found." });
    }

    if (image.size > 1024 * 1024) {
      return fail(400, { error: "Image size should be less than 1MB." });
    }

    const s3Client = new S3Client({
      region: "eu-central-1",
      credentials: {
        accessKeyId: MY_AWS_ACCESS_KEY,
        secretAccessKey: MY_AWS_SECRET_KEY,
      },
    });

    const chunks = [];
// @ts-expect-error typescript go brr
    for await (const chunk of image.stream()) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    const uploadedFile = await s3Client.send(new PutObjectCommand({
      Bucket: "svelte-pizzeria-bucket",
      Key: `profile/${userId}`,
      ACL: "public-read",
      ContentType: image.type,
      Body: buffer,
    }));

    if (uploadedFile["$metadata"].httpStatusCode === 200) {
      const imageUrl = `https://svelte-pizzeria-bucket.s3.eu-central-1.amazonaws.com/profile/${userId}?t=${Date.now()}`;
      const result = await db.execute(sql`
          UPDATE "users"
          SET image = ${imageUrl}
          WHERE "users".id = ${userId}
      `);

      if (result) {
        return { success: true, link: imageUrl };
      }
    } else {
      return fail(400, { error: "Failed to upload image." });
    }


  },
} satisfies Actions;
