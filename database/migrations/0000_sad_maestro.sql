DO $$ BEGIN
 CREATE TYPE "public"."discountType" AS ENUM('PORCENTAGE', 'FIXED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('pending', 'delivered', 'cancelled');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."version" AS ENUM('normal', 'pro', 'pro_max');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "addresses" (
	"id" serial PRIMARY KEY NOT NULL,
	"street" varchar(255),
	"city" varchar(255),
	"country" varchar(255),
	"zipCode" varchar(255),
	"references" varchar(255),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "carts" (
	"id" char(36) PRIMARY KEY NOT NULL,
	"userId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cartDetails" (
	"id" serial PRIMARY KEY NOT NULL,
	"cartId" char(36) NOT NULL,
	"productId" integer NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"colorId" integer NOT NULL,
	"storageId" integer NOT NULL,
	"discountId" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "cartDetails_cartId_productId_colorId_unique" UNIQUE("cartId","productId","colorId"),
	CONSTRAINT "cartDetails_cartId_discountId_unique" UNIQUE("cartId","discountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "collections" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"image" varchar(255),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "colors" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(200) NOT NULL,
	"color" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "configurationimage" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"width" integer NOT NULL,
	"height" integer NOT NULL,
	"imageUrl" text NOT NULL,
	"croppedImageUrl" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "defaultAddress" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer,
	"addressId" integer,
	CONSTRAINT "defaultAddress_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "defaultGift" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer,
	"giftId" integer,
	CONSTRAINT "defaultGift_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "discountCode" (
	"id" serial PRIMARY KEY NOT NULL,
	"string" varchar(255),
	"discountAmount" integer NOT NULL,
	"discountType" "discountType" NOT NULL,
	"uses" integer DEFAULT 0,
	"isActive" boolean DEFAULT true,
	"allProducts" boolean DEFAULT false,
	"productIds" json,
	"limit" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "discountCode_string_unique" UNIQUE("string")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "favorites" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"productId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gift" (
	"id" serial PRIMARY KEY NOT NULL,
	"senderName" varchar(255),
	"firstName" varchar(255),
	"lastName" varchar(255),
	"phonenumber" bigint,
	"message" varchar(140),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstName" varchar(255),
	"lastName" varchar(255),
	"email" varchar(255),
	"password" varchar(255) NOT NULL,
	"phonenumber" bigint,
	"rolId" integer DEFAULT 1 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" char(36) PRIMARY KEY NOT NULL,
	"total" integer DEFAULT 0,
	"status" "status" DEFAULT 'pending',
	"userId" integer,
	"discountCodeId" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orderDetails" (
	"id" serial PRIMARY KEY NOT NULL,
	"orderId" char(36),
	"productId" integer,
	"quantity" integer DEFAULT 1 NOT NULL,
	"colorId" integer,
	"storageId" integer,
	"discountId" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"price" integer NOT NULL,
	"description" varchar(255),
	"image" varchar(255),
	"stock" integer DEFAULT 1 NOT NULL,
	"categoryId" integer NOT NULL,
	"printPatternId" integer NOT NULL,
	"materialId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "productColors" (
	"id" serial PRIMARY KEY NOT NULL,
	"colorId" integer NOT NULL,
	"productId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "productSpecifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"ram" integer,
	"screenSize" integer,
	"screenResolution" integer,
	"rearCamera" varchar(255),
	"frontCamera" varchar(255),
	"batteryCapacity" integer,
	"operatingSystem" varchar(255),
	"productId" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "productStorages" (
	"id" serial PRIMARY KEY NOT NULL,
	"productId" integer,
	"storageId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "storages" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "storagePrice" (
	"id" serial PRIMARY KEY NOT NULL,
	"productId" integer NOT NULL,
	"storageId" integer NOT NULL,
	"price" bigint NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rol" (
	"id" serial PRIMARY KEY NOT NULL,
	"rol" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "productDiscount" (
	"id" serial PRIMARY KEY NOT NULL,
	"productId" integer NOT NULL,
	"discountId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "printPattern" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "material" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "productImages" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" varchar(255),
	"image" varchar(255),
	"discountId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "addresses" ADD CONSTRAINT "addresses_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "carts" ADD CONSTRAINT "carts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cartDetails" ADD CONSTRAINT "cartDetails_cartId_carts_id_fk" FOREIGN KEY ("cartId") REFERENCES "public"."carts"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cartDetails" ADD CONSTRAINT "cartDetails_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cartDetails" ADD CONSTRAINT "cartDetails_colorId_colors_id_fk" FOREIGN KEY ("colorId") REFERENCES "public"."colors"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cartDetails" ADD CONSTRAINT "cartDetails_storageId_storages_id_fk" FOREIGN KEY ("storageId") REFERENCES "public"."storages"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cartDetails" ADD CONSTRAINT "cartDetails_discountId_discountCode_id_fk" FOREIGN KEY ("discountId") REFERENCES "public"."discountCode"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "defaultAddress" ADD CONSTRAINT "defaultAddress_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "defaultAddress" ADD CONSTRAINT "defaultAddress_addressId_addresses_id_fk" FOREIGN KEY ("addressId") REFERENCES "public"."addresses"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "defaultGift" ADD CONSTRAINT "defaultGift_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "defaultGift" ADD CONSTRAINT "defaultGift_giftId_gift_id_fk" FOREIGN KEY ("giftId") REFERENCES "public"."gift"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favorites" ADD CONSTRAINT "favorites_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favorites" ADD CONSTRAINT "favorites_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gift" ADD CONSTRAINT "gift_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderDetails" ADD CONSTRAINT "orderDetails_orderId_orders_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderDetails" ADD CONSTRAINT "orderDetails_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderDetails" ADD CONSTRAINT "orderDetails_colorId_colors_id_fk" FOREIGN KEY ("colorId") REFERENCES "public"."colors"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderDetails" ADD CONSTRAINT "orderDetails_storageId_storages_id_fk" FOREIGN KEY ("storageId") REFERENCES "public"."storages"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderDetails" ADD CONSTRAINT "orderDetails_discountId_discountCode_id_fk" FOREIGN KEY ("discountId") REFERENCES "public"."discountCode"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_collections_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."collections"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_printPatternId_printPattern_id_fk" FOREIGN KEY ("printPatternId") REFERENCES "public"."printPattern"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_materialId_material_id_fk" FOREIGN KEY ("materialId") REFERENCES "public"."material"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "productColors" ADD CONSTRAINT "productColors_colorId_colors_id_fk" FOREIGN KEY ("colorId") REFERENCES "public"."colors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "productColors" ADD CONSTRAINT "productColors_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "productSpecifications" ADD CONSTRAINT "productSpecifications_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "productStorages" ADD CONSTRAINT "productStorages_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "productStorages" ADD CONSTRAINT "productStorages_storageId_storages_id_fk" FOREIGN KEY ("storageId") REFERENCES "public"."storages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "storagePrice" ADD CONSTRAINT "storagePrice_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "storagePrice" ADD CONSTRAINT "storagePrice_storageId_storages_id_fk" FOREIGN KEY ("storageId") REFERENCES "public"."storages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "productDiscount" ADD CONSTRAINT "productDiscount_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "productDiscount" ADD CONSTRAINT "productDiscount_discountId_discountCode_id_fk" FOREIGN KEY ("discountId") REFERENCES "public"."discountCode"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "productImages" ADD CONSTRAINT "productImages_discountId_products_id_fk" FOREIGN KEY ("discountId") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "userId" ON "addresses" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "userId_user_index" ON "carts" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cartId" ON "cartDetails" ("cartId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "productId" ON "cartDetails" ("productId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "colorId" ON "cartDetails" ("colorId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "storageId" ON "cartDetails" ("storageId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cart_product_unique" ON "cartDetails" ("cartId","quantity");