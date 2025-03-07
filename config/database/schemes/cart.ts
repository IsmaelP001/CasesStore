import {  pgTable,serial,char, primaryKey,integer,index,uniqueIndex, varchar, uuid, boolean, pgEnum, text } from 'drizzle-orm/pg-core';
import { order, user } from '.';
import { relations, sql } from 'drizzle-orm';
import { cartDetails } from './cartDetails';

export const cartStatus=pgEnum("status", ['PENDING','ACTIVE','CHECKED_OUT','ABANDONED',"CONFIRMED"] )

export const cart = pgTable("carts", {
	id: uuid("id").primaryKey().defaultRandom().notNull(),
	userId: uuid("userId").references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" } ),
    status:text('cart_status').notNull()
},
(table) => {
	return {
		userId: index("userId_user_index").on(table.userId),
       
	}
});

export const cartRelations=relations(cart,({many,one})=>({
    cartDetails:many(cartDetails),
    user:one(user,{
        fields:[cart.userId],
        references:[user.id]
    }),
    order:one(order)
}))

export type CartTableSchema=typeof cart.$inferInsert