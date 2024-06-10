ALTER TABLE "users" ALTER COLUMN "password" SET DATA TYPE varchar(275);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL;