ALTER TABLE "products" RENAME COLUMN "categoryId" TO "collectionId";--> statement-breakpoint
ALTER TABLE "products" DROP CONSTRAINT "products_categoryId_collections_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_collectionId_collections_id_fk" FOREIGN KEY ("collectionId") REFERENCES "public"."collections"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
