import { relations } from 'drizzle-orm';
import {  pgTable,serial,char, primaryKey,integer,index,uniqueIndex,timestamp,unique,text,varchar } from 'drizzle-orm/pg-core';
import {  address, user } from './';


export const defaultAddress = pgTable("defaultAddress", {
	id: serial("id").primaryKey().notNull(),
	userId:integer('userId').references(()=>user.id,{onDelete:'cascade',onUpdate:'cascade'}).unique(),
	addressId: integer("addressId").references(()=>address.id,{onDelete:'cascade',onUpdate:'cascade'})
});

export const defaultAddressRelations=relations(defaultAddress,({one})=>({
    address:one(address,{
        fields:[defaultAddress.addressId],
        references:[address.id]
    }),
    user:one(user,{
        fields:[defaultAddress.userId],
        references:[user.id]
    })
}))