ALTER TABLE "products" DROP CONSTRAINT "products_deviceId_devices_id_fk";
--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "deviceId";