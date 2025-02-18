import {  pgTable,serial,char, primaryKey,integer,index,uniqueIndex, varchar, uuid, boolean } from 'drizzle-orm/pg-core';
import { order, user } from '.';
import { relations, sql } from 'drizzle-orm';
import { cartDetails } from './cartDetails';

export const cart = pgTable("carts", {
	id: uuid("id").primaryKey().defaultRandom(),
	userId: uuid("userId").references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" } ),
    hasCheckout:boolean('hasCheckout').notNull().default(false)
},
(table) => {
	return {
		userId: index("userId_user_index").on(table.userId),
        hasCheckout_unique_true:index()
        .on(table.hasCheckout)
        .where(sql`${table.hasCheckout} = TRUE`)
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