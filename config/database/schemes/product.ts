import {  pgTable,serial,char, primaryKey,integer, index,boolean,json,uniqueIndex,timestamp,unique,text,varchar, pgEnum, uuid } from 'drizzle-orm/pg-core';
import { collection,favorite,cartDetails,orderDetails, discountCode, productDiscount, printPattern, material, productImages, color, devices, productDevices, configurationimage} from '.';
import { relations } from 'drizzle-orm';
import { productTypeEnumValues } from '@/server/catalog/domain/product.model';

export const productTypeEnum = pgEnum('product_type', productTypeEnumValues);


export const product = pgTable("products", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: varchar("name", { length: 255 }),
	price: integer("price").notNull(),
    discountPrice:integer('discountPrice'),
    productType:productTypeEnum('product_type').notNull(),
    isConfigurable:boolean('isConfigurable').default(false),
	collectionId: uuid("collectionId").references(() => collection.id),
    printPatternId:uuid('printPatternId').references(()=>printPattern.id),
    materialId:uuid('materialId').references(()=>material.id),
    coverImage:text('coverImage').notNull(),
    colorId:uuid('colorId').references(()=>color.id),
	createdAt: timestamp('createdAt',{mode:'date'}).notNull().defaultNow(),
	updatedAt: timestamp('updatedAt',{mode:'date'}).notNull().defaultNow(),
});

export const productRelations=relations(product,({one,many})=>({
    collection:one(collection,{
        fields:[product.collectionId],
        references:[collection.id]
    }),
    favorite:many(favorite),
    cartDetails:many(cartDetails),
    orderDetails:many(orderDetails),
    discount:many(productDiscount),
    printPattern:one(printPattern,{
        fields:[product.printPatternId],
        references:[printPattern.id]
    }),
    material:one(material,{
        fields:[product.materialId],
        references:[material.id]
    }),
    images:many(productImages),
    productDevices:many(productDevices),
    color:one(color,{
        fields:[product.colorId],
        references:[color.id]
    }),
  
}))