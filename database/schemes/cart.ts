import {  pgTable,serial,char, primaryKey,integer,index,uniqueIndex, varchar } from 'drizzle-orm/pg-core';
import { user } from './';
import { relations } from 'drizzle-orm';
import { cartDetails } from './cartDetails';
import { v4 as uuidv4 } from 'uuid';

export const cart = pgTable("carts", {
	id: char("id", { length: 36 }).primaryKey().notNull().$defaultFn(()=>uuidv4()),
	userId: integer("userId").references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" } ),
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
    })
}))