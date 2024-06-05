CREATE TABLE IF NOT EXISTS "productDevices" (
	"id" serial PRIMARY KEY NOT NULL,
	"productId" integer NOT NULL,
	"deviceId" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "compatibleProduct" RENAME TO "devices";--> statement-breakpoint
ALTER TABLE "products" RENAME COLUMN "compatibleProductId" TO "deviceId";--> statement-breakpoint
ALTER TABLE "products" DROP CONSTRAINT "products_compatibleProductId_materials_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "productDevices" ADD CONSTRAINT "productDevices_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "productDevices" ADD CONSTRAINT "productDevices_deviceId_devices_id_fk" FOREIGN KEY ("deviceId") REFERENCES "public"."devices"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_deviceId_devices_id_fk" FOREIGN KEY ("deviceId") REFERENCES "public"."devices"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
