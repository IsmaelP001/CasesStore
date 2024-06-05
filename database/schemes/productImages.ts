import { relations } from 'drizzle-orm';
import {  pgTable,serial,char, primaryKey,integer,index,uniqueIndex,timestamp,unique, varchar, text } from 'drizzle-orm/pg-core';
import { product } from '.';

export const productImages = pgTable("productImages", {
	id: serial("id").primaryKey().notNull(),
	image: text("image"),
    productId:integer("productId").notNull().references(() => product.id,{onDelete:'cascade',onUpdate:'cascade'}),
	createdAt: timestamp('createdAt',{mode:'date'}).notNull().defaultNow(),
	updatedAt: timestamp('updatedAt',{mode:'date'}).notNull().defaultNow(),
});


export const productImagesRelations=relations(productImages,({one})=>({
    product:one(product,{
        fields:[productImages.productId],
        references:[product.id]
    })
}))


