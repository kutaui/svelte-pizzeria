CREATE TABLE IF NOT EXISTS "profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"street_address" text,
	"postal_code" text,
	"city" text,
	"country" text,
	"phone" text,
	"admin" boolean DEFAULT false NOT NULL,
	"name" text NOT NULL,
	"bio" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
