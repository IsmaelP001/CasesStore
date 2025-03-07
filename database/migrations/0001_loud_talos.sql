DROP INDEX IF EXISTS "carts_hasCheckout_index";--> statement-breakpoint
ALTER TABLE "carts" ADD COLUMN "cart_status" text NOT NULL;--> statement-breakpoint
ALTER TABLE "carts" DROP COLUMN IF EXISTS "hasCheckout";