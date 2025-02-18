import { relations, sql } from 'drizzle-orm';
import {  pgTable,serial,char, primaryKey,integer,bigint, index,boolean,json,uniqueIndex,timestamp,unique,text,varchar, pgEnum, uuid } from 'drizzle-orm/pg-core';
import { address,favorite,cart,order, defaultAddress, gift,rol, defaultGift} from '.';


export const user = pgTable("users", {
	id: uuid("id").primaryKey().defaultRandom(),
	firstName: varchar("firstName", { length: 255 }).notNull(),
	lastName: varchar("lastName", { length: 255 }),
	email: varchar("email", { length: 255 }).notNull(),
	provider:varchar('provider',{length:255}),
	password:varchar("password",{length:275}),
	phonenumber:varchar('phonenumber',{length:10}),
	rolId:uuid('rolId').notNull().references(()=>rol.id),
	createdAt: timestamp('createdAt',{mode:'date'}).notNull().defaultNow(),
	updatedAt: timestamp('updatedAt',{mode:'date'}).notNull().defaultNow(),
},(table=>(
	{
		unique_email_provider:unique().on(table.email,table.provider)
	}
)))

export const userRelations=relations(user,({one,many})=>({
    address:many(address),
    favorite:many(favorite),
    cart:one(cart),
    order:one(order),
	rol:one(rol,{
		fields:[user.rolId],
		references:[rol.id]
	}),
	defaultAddress:one(defaultAddress),
	gift:many(gift),
	defaultGift:one(defaultGift)
}))
