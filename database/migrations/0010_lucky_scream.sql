DROP TABLE "productColors";--> statement-breakpoint
DROP TABLE "productSpecifications";--> statement-breakpoint
DROP TABLE "productStorages";--> statement-breakpoint
ALTER TABLE "cartDetails" DROP CONSTRAINT "cartDetails_storageId_storages_id_fk";
--> statement-breakpoint
ALTER TABLE "orderDetails" DROP CONSTRAINT "orderDetails_storageId_storages_id_fk";
--> statement-breakpoint
DROP INDEX IF EXISTS "storageId";--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "colorId" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_colorId_colors_id_fk" FOREIGN KEY ("colorId") REFERENCES "public"."colors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "cartDetails" DROP COLUMN IF EXISTS "storageId";--> statement-breakpoint
ALTER TABLE "orderDetails" DROP COLUMN IF EXISTS "storageId";