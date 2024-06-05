import { relations } from 'drizzle-orm';
import {  pgTable,serial,char, primaryKey,integer,index,uniqueIndex,timestamp,unique, varchar } from 'drizzle-orm/pg-core';
import { product } from '.';

export const printPattern = pgTable("printPattern", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	createdAt: timestamp('createdAt',{mode:'date'}).notNull().defaultNow(),
	updatedAt: timestamp('updatedAt',{mode:'date'}).notNull().defaultNow(),
});


export const printPatternRelations=relations(printPattern,({many})=>({
    product:many(product)
}))


