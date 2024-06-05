import {  pgTable,serial, primaryKey,integer,index,timestamp,uniqueIndex, varchar } from 'drizzle-orm/pg-core';
import { defaultAddress, user } from './index';
import { relations } from 'drizzle-orm';

export const address= pgTable("addresses", {
	id: serial("id").primaryKey().notNull(),
	street: varchar("street", { length: 255 }),
	city: varchar("city", { length: 255 }),
	country: varchar("country", { length: 255 }),
	zipCode: varchar("zipCode", { length: 255 }),
	references: varchar("references", { length: 255 }),
	createdAt: timestamp('createdAt',{mode:'date'}).notNull().defaultNow(),
	updatedAt: timestamp('updatedAt',{mode:'date'}).notNull().defaultNow(),
	userId: integer("userId").references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" } ),
},
(table) => {
	return {
		userId: index("userId").on(table.userId),
	}
});

export const addressRelations=relations(address,({one,many})=>({
    user:one(user,{
        fields:[address.userId],
        references:[user.id]
    }),
	defaultAddress:many(defaultAddress),
	
}))