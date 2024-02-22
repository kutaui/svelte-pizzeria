DROP TABLE "profile";--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "street_address" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "postal_code" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "city" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "country" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "phone" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "admin" boolean DEFAULT false NOT NULL;