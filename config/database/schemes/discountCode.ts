import { relations } from 'drizzle-orm';
import {  pgTable,integer,boolean,json,timestamp,varchar, pgEnum, uuid } from 'drizzle-orm/pg-core';
import { couponCartItems, orderDetails, productDiscount } from '.';
export const discountTipeEnum=pgEnum("discountType", ['PORCENTAGE','FIXED'])

export const discountCode = pgTable("discountCode", {
	id: uuid("id").primaryKey().defaultRandom(),
	code: varchar("string", { length: 255 }).unique(),
	discountAmount: integer("discountAmount").notNull(),
	discountType: discountTipeEnum('discountType').notNull(),
    isActive:boolean('isActive').default(true),
    allProducts:boolean('allProducts').default(false),
    productIds:json('productIds'),
    limit:integer('limit'),
    uses:integer('uses').notNull().default(0),
	createdAt: timestamp('createdAt',{mode:'date'}).notNull().defaultNow(),
    expiresAt: timestamp('expiresAt',{mode:"date"}).notNull(),
});


export const discountCodeRelations=relations(discountCode,({many})=>({
    productDiscount:many(productDiscount),
    couponCartItems:many(couponCartItems)
}))


