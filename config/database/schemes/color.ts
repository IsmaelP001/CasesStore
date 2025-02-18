import { relations } from 'drizzle-orm';
import {  pgTable,serial,char, primaryKey,integer,index,uniqueIndex,timestamp,unique, varchar, uuid } from 'drizzle-orm/pg-core';
import { cartDetails, orderDetails, product } from '.';


export const color = pgTable("colors", {
	id: uuid("id").primaryKey().defaultRandom(),
	name:varchar('name',{length:200}).notNull(),
	color: varchar("color", { length: 255 }).notNull(),
	createdAt: timestamp('createdAt',{mode:'date'}).notNull().defaultNow(),
	updatedAt: timestamp('updatedAt',{mode:'date'}).notNull().defaultNow(),
});

export const colorRelations=relations(color,({many,one})=>({
	color:many(product),
	cartDetais:many(cartDetails),
	orderDetails:many(orderDetails),
}))