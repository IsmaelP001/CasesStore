import {  pgTable,serial,char, primaryKey,integer, index,boolean,json,uniqueIndex,timestamp,unique,text,varchar, pgEnum } from 'drizzle-orm/pg-core';
import { collection,favorite,cartDetails,orderDetails, discountCode, productDiscount, printPattern, material, productImages, color, devices, productDevices} from './';
import { relations } from 'drizzle-orm';

export const versionEnum=pgEnum("version", ['normal','pro','pro_max'])


export const product = pgTable("products", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }),
	price: integer("price").notNull(),
    stock:integer('stock').notNull().default(1),
    isConfigurable:boolean('isConfigurable').notNull().default(false),
	collectionId: integer("collectionId").references(() => collection.id),
    printPatternId:integer('printPatternId').references(()=>printPattern.id),
    materialId:integer('materialId').references(()=>material.id),
    colorId:integer('colorId').references(()=>color.id),
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
    })
  
}))