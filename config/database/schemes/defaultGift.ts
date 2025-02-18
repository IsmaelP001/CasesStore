import { relations } from 'drizzle-orm';
import {  pgTable,serial,char, primaryKey,integer,index,uniqueIndex,timestamp,unique,text,varchar, uuid } from 'drizzle-orm/pg-core';
import {  address, user,gift } from '.';


export const defaultGift = pgTable("defaultGift", {
	id: serial("id").primaryKey().notNull(),
	userId:uuid('userId').references(()=>user.id,{onDelete:'cascade',onUpdate:'cascade'}).unique(),
	giftId: uuid("giftId").references(()=>gift.id,{onDelete:'cascade',onUpdate:'cascade'})
});

export const defaultGiftRelations=relations(defaultGift,({one})=>({
    gift:one(gift,{
        fields:[defaultGift.giftId],
        references:[gift.id]
    }),
    user:one(user,{
        fields:[defaultGift.userId],
        references:[user.id]
    })
}))