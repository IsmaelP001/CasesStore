import { relations } from 'drizzle-orm';
import {  pgTable,serial,char, primaryKey,integer, index,boolean,json,uniqueIndex,timestamp,unique,text,varchar, pgEnum } from 'drizzle-orm/pg-core';
import { cartDetails, order, orderDetails, product, productDiscount } from './';

export const discountTipeEnum=pgEnum("discountType", ['PORCENTAGE','FIXED'])

export const discountCode = pgTable("discountCode", {
	id: serial("id").primaryKey().notNull(),
	code: varchar("string", { length: 255 }).unique(),
	discountAmount: integer("discountAmount").notNull(),
	discountType: discountTipeEnum('discountType').notNull(),
    uses: integer('uses').default(0),
    isActive:boolean('isActive').default(true),
    allProducts:boolean('allProducts').default(false),
    productIds:json('productIds'),
    limit:integer('limit'),
	createdAt: timestamp('createdAt',{mode:'date'}).notNull().defaultNow(),
	updatedAt: timestamp('updatedAt',{mode:'date'}).notNull().defaultNow(),
});


export const discountCodeRelations=relations(discountCode,({many})=>({
    productDiscount:many(productDiscount),
    order:many(order),
    cartDetails:many(cartDetails),
    orderDetails:many(orderDetails)
}))


