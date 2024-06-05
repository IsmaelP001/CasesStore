ALTER TABLE "material" RENAME TO "materials";--> statement-breakpoint
ALTER TABLE "products" DROP CONSTRAINT "products_materialId_material_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_materialId_materials_id_fk" FOREIGN KEY ("materialId") REFERENCES "public"."materials"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
