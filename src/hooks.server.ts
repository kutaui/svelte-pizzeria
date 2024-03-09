import { type Handle, redirect } from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import { db } from "$lib/db/db.server";
import { eq } from "drizzle-orm";
import { users } from "$lib/db/schema";
import { JWT_SECRET } from "$env/static/private";

export const handle: Handle = async ({ event, resolve }) => {
  const authToken = event.cookies.get("authToken") || "";

  try {
    if (!authToken) {
      event.locals.user = undefined;
      return redirect(303, "/login");
    }
    const claims = jwt.verify(authToken, JWT_SECRET);
    if (typeof claims === "string") {
      throw new Error("Something went wrong");
    }
    if (!claims) {
      event.cookies.delete("authToken", { path: "/" });
      event.locals.user = undefined;
      return redirect(303, "/login");

    }

    const result = await db.query.users.findFirst({
      where: eq(users.id, claims.id),
    });

    if (!result) {
      event.cookies.delete("authToken", { path: "/" });
      throw new Error("User not found");
    }

    const { password, ...userMinusPassword } = result;
    event.locals.user = userMinusPassword;
  } catch (error) {
    console.log(error);
  }

  if (event.url.pathname === "/login" || event.url.pathname === "/register") {
    /*   if (event.locals.user) {
         return redirect(303, "/");
       }*/
  }

  if (event.locals.user === undefined && event.url.pathname === "/profile") {

    return redirect(303, "/login");
  }
  return resolve(event);
};
