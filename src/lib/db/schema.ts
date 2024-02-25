import {
  boolean,
  json,
  jsonb,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  streetAddress: text("street_address"),
  postalCode: text("postal_code"),
  city: text("city"),
  country: text("country"),
  phone: text("phone"),
  admin: boolean("admin").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  image: text("image"),
  name: text("name"),
  description: text("description"),
  categoryId: serial("category_id").references(() => categories.id),
  basePrice: numeric("base_price"),
  sizes: json("sizes").$type<{ name: string; price: string }>(),
  extraIngredientPrices: json("extra_ingredient_prices").$type<{
    name: string;
    price: string;
  }>(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
