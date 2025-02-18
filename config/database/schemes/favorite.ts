import {  pgTable,serial,char, primaryKey,integer, index,boolean,json,uniqueIndex,timestamp,unique,text,varchar, pgEnum, uuid } from 'drizzle-orm/pg-core';
import { user ,product} from '.';
import { relations } from 'drizzle-orm';


export const favorite = pgTable("favorites", {
	id: serial("id").primaryKey().notNull(),
	userId: uuid("userId").notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	productId: uuid("productId").notNull().references(() => product.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	createdAt: timestamp("createdAt", { mode: 'date'}).notNull().defaultNow(),
	updatedAt: timestamp("updatedAt", { mode: 'date'}).notNull().defaultNow(),
})

export const favoriteRelations=relations(favorite,({one})=>({
	product:one(product,{
		fields:[favorite.productId],
		references:[product.id]
	}),
	user:one(user,{
		fields:[favorite.userId],
		references:[user.id]
	})
}))

