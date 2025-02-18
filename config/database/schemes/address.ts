import {  pgTable,serial, primaryKey,integer,index,timestamp,uniqueIndex, varchar, uuid, boolean, unique } from 'drizzle-orm/pg-core';
import { defaultAddress, order, user } from './index';
import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm';

export const address= pgTable("addresses", {
	id: uuid("id").primaryKey().defaultRandom().notNull(),
	street: varchar("street", { length: 255 }),
	city: varchar("city", { length: 255 }),
	country: varchar("country", { length: 255 }),
	zipCode: varchar("zipCode", { length: 255 }),
	references: varchar("references", { length: 255 }),
	createdAt: timestamp('createdAt',{mode:'date'}).notNull().defaultNow(),
	updatedAt: timestamp('updatedAt',{mode:'date'}).notNull().defaultNow(),
	userId: uuid("userId").references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
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
	order:many(order)
	
}))

export type SelectAddress = InferSelectModel<typeof address>
export type InsertAddress = InferInsertModel<typeof address>