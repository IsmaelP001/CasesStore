import {  pgTable,serial,char, primaryKey,integer, index,boolean,json,uniqueIndex,timestamp,unique,text,varchar, pgEnum } from 'drizzle-orm/pg-core';
import { user,orderDetails, discountCode } from './';
import { relations } from 'drizzle-orm';

export const orderStatus=pgEnum("status", ['pending','delivered','cancelled']) 

export const order = pgTable("orders", {
	id: char("id", { length: 36 }).primaryKey().notNull(),
	total: integer("total").default(0),
	status: orderStatus('status').default('pending'),
	userId: integer("userId").references(() => user.id, { onDelete: "set null", onUpdate: "cascade" } ),
	discountCodeId:integer('discountCodeId'),
	createdAt: timestamp('createdAt',{mode:'date'}).notNull().defaultNow(),
	updatedAt: timestamp('updatedAt',{mode:'date'}).notNull().defaultNow(),
});

export const orderRelations=relations(order,({many,one})=>({
    orderDetails:many(orderDetails),
    user:one(user,{
        fields:[order.userId],
        references:[user.id]
    }),
	discount:one(discountCode,{
        fields:[order.discountCodeId],
        references:[discountCode.id]
    })
}))