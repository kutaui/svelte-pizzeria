import { type Assume, eq } from "drizzle-orm";
import { db } from "$lib/db/db.server";
import { user } from "$lib/db/schema";
import type { Actions, ServerLoad } from "@sveltejs/kit";
import { fail, redirect } from "@sveltejs/kit";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { User } from "$lib/types/User";
import { JWT_SECRET } from "$env/static/private";
import { dev } from "$app/environment";

export const actions = {
  login: async ({ request, cookies }) => {
    const form = await request.formData();
    const email = form.get("email") ?? ""; // Provide a default value
    const password = form.get("password") ?? ""; // Provide a default value
  },
  logout: async ({ request, cookies }) => {
    // TODO:
  },
  register: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    if (!email) {
      return fail(400, { error: "Email field is required" });
    }

    if (!password) {
      return fail(400, { error: "Password field is required" });
    }

    const result = await db.query.user.findFirst({
      where: eq(user.email, email),
    });

    if (result) {
      return fail(400, { error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db
      .insert(user)
      .values({ email, password: hashedPassword })
      .returning({ insertedId: user.id });

    const token = jwt.sign({ id: newUser[0].insertedId }, JWT_SECRET);

    cookies.set("authToken", token, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: !dev,
      maxAge: 60 * 60 * 24 * 7,
    });

    return redirect(307, "/");
  },
} satisfies Actions;
