ALTER TABLE "cartDetails" ADD COLUMN "deviceId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "orderDetails" ADD COLUMN "deviceId" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cartDetails" ADD CONSTRAINT "cartDetails_deviceId_devices_id_fk" FOREIGN KEY ("deviceId") REFERENCES "public"."devices"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderDetails" ADD CONSTRAINT "orderDetails_deviceId_devices_id_fk" FOREIGN KEY ("deviceId") REFERENCES "public"."devices"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
