import {  pgTable,serial,char, primaryKey,integer, index,boolean,json,uniqueIndex,timestamp,unique,text,varchar, pgEnum, uuid } from 'drizzle-orm/pg-core';
import { color,discountCode,product } from '.';
import { relations } from 'drizzle-orm';

export const productDiscount = pgTable("productDiscount", {
	id: serial("id").primaryKey().notNull(),
	productId: uuid("productId").notNull().references(() => product.id,{onDelete:'cascade',onUpdate:'cascade'}),
	discountId: uuid("discountId").notNull().references(() => discountCode.id,{onDelete:'cascade',onUpdate:'cascade'}),
});


export const productDiscountRelations=relations(productDiscount,({one})=>({
    discount:one(discountCode,{
    fields:[productDiscount.discountId],
    references:[discountCode.id]
  }),
  productDiscount:one(product,{
    fields:[productDiscount.productId],
    references:[product.id]
  })
}))




