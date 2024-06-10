import { relations } from 'drizzle-orm';
import {  pgTable,serial,char, primaryKey,integer,index,uniqueIndex,timestamp,unique, varchar } from 'drizzle-orm/pg-core';
import { cartDetails, orderDetails, product, productDevices } from '.';

export const devices = pgTable("devices", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	createdAt: timestamp('createdAt',{mode:'date'}).notNull().defaultNow(),
	updatedAt: timestamp('updatedAt',{mode:'date'}).notNull().defaultNow(),
});


export const devicesRelations=relations(devices,({many})=>({
    product:many(productDevices),
	cartDetails:many(cartDetails),
	orderDetails:many(orderDetails)
	
}))


