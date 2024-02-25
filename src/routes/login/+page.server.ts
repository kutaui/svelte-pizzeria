import { eq } from "drizzle-orm";
import { db } from "$lib/db/db.server";
import { users } from "$lib/db/schema";
import type { Actions } from "@sveltejs/kit";
import { fail, redirect } from "@sveltejs/kit";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "$env/static/private";
import { dev } from "$app/environment";

export const actions = {
  login: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    if (!email) {
      return fail(400, { error: "Email field is required" });
    }

    if (!password) {
      return fail(400, { error: "Password field is required" });
    }

    const result = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!result) {
      return fail(400, { error: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, result.password);

    if (!match) {
      return fail(400, { error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: result.id }, JWT_SECRET);

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
