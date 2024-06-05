DO $$ BEGIN
 CREATE TYPE "public"."material" AS ENUM('silicone', 'polycarbonate');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."model" AS ENUM('iphonex', 'iphone11', 'iphone12', 'iphone13', 'iphone14', 'iphone15');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "configurationimage" ADD COLUMN "material" "material";--> statement-breakpoint
ALTER TABLE "configurationimage" ADD COLUMN "model" "model";--> statement-breakpoint
ALTER TABLE "configurationimage" DROP COLUMN IF EXISTS "croppedImageUrl";