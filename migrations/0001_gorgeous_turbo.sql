ALTER TABLE "myTableName" RENAME TO "user";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "name" TO "email";--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "password" text NOT NULL;