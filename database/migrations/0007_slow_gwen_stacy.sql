ALTER TABLE "productImages" RENAME COLUMN "discountId" TO "productId";--> statement-breakpoint
ALTER TABLE "productImages" DROP CONSTRAINT "productImages_discountId_products_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "productImages" ADD CONSTRAINT "productImages_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
