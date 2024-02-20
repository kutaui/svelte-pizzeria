import { type Handle, redirect } from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import { db } from "$lib/db/db.server";
import { eq } from "drizzle-orm";
import { user } from "$lib/db/schema";
import { JWT_SECRET } from "$env/static/private";

export const handle: Handle = async ({ event, resolve }) => {
  const authToken = event.cookies.get("authToken") || "";

  try {
    if (!authToken) event.locals.user = undefined;
    const claims = jwt.verify(authToken, JWT_SECRET);
    if (typeof claims === "string") {
      throw new Error("Something went wrong");
    }
    if (!claims) event.locals.user = undefined;

    const result = await db.query.user.findFirst({
      where: eq(user.id, claims.id),
    });

    if (!result) {
      console.log("User not found");
      throw new Error("User not found");
    }
    const { password, ...userMinusPassword } = result;
    event.locals.user = userMinusPassword;
  } catch (error) {
    console.log(error);
  }

  if (
    event.locals.user &&
    (event.url.pathname === "/login" || event.url.pathname === "/register")
  ) {
    return redirect(303, "/");
  }

  if (!event.locals.user && event.url.pathname === "/profile") {
    return redirect(303, "/");
  }
  return resolve(event);
};
