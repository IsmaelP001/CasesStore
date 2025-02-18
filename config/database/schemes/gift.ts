import {  pgTable,serial,char, primaryKey,integer,bigint, index,boolean,json,uniqueIndex,timestamp,unique,text,varchar, pgEnum, uuid } from 'drizzle-orm/pg-core';
import { defaultAddress, user } from './index';
import { InferSelectModel, relations } from 'drizzle-orm';
import { defaultGift } from './defaultGift';

export const gift= pgTable("gift", {
	id: uuid("id").primaryKey().defaultRandom(),
	senderName: varchar("senderName", { length: 255 }),
	firstName: varchar("firstName", { length: 255 }),
	lastName: varchar("lastName", { length: 255 }),
	phonenumber: varchar("phonenumber",{length:11}),
	message: varchar("message", { length: 140 }),
	createdAt: timestamp('createdAt',{mode:'date'}).notNull().defaultNow(),
	updatedAt: timestamp('updatedAt',{mode:'date'}).notNull().defaultNow(),
	userId: uuid("userId").references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" } ),
});

export const giftRelations=relations(gift,({one,many})=>({
    user:one(user,{
        fields:[gift.userId],
        references:[user.id]
    }),
	defaultGift:one(defaultGift),
	
}))

export type Gift=InferSelectModel<typeof gift>
