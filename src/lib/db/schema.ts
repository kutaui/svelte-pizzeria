import { boolean, pgTable, serial, text } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  streetAddress: text("street_address"),
  postalCode: text("postal_code"),
  city: text("city"),
  country: text("country"),
  phone: text("phone"),
  admin: boolean("admin").notNull().default(false),
  image: text("image"),
});
