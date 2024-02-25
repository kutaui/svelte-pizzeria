ALTER TABLE "menu_items" ALTER COLUMN "sizes" SET DATA TYPE json;--> statement-breakpoint
ALTER TABLE "menu_items" ALTER COLUMN "extra_ingredient_prices" SET DATA TYPE json;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "menu_items" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;