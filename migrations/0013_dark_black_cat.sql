CREATE TABLE IF NOT EXISTS "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_email" text,
	"phone" text,
	"street_address" text,
	"postal_code" text,
	"city" text,
	"country" text,
	"cart_products" jsonb,
	"paid" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "menu_items" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" DROP COLUMN IF EXISTS "updated_at";