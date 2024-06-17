ALTER TABLE "productDevices" DROP CONSTRAINT "productDevices_productId_products_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "productDevices" ADD CONSTRAINT "productDevices_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
