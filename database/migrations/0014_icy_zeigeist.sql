ALTER TABLE "cartDetails" ADD COLUMN "configurationId" integer;--> statement-breakpoint
ALTER TABLE "orderDetails" ADD COLUMN "configurationId" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cartDetails" ADD CONSTRAINT "cartDetails_configurationId_configurationimage_id_fk" FOREIGN KEY ("configurationId") REFERENCES "public"."configurationimage"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderDetails" ADD CONSTRAINT "orderDetails_configurationId_configurationimage_id_fk" FOREIGN KEY ("configurationId") REFERENCES "public"."configurationimage"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
