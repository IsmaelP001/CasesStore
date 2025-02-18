import { relations, sql } from 'drizzle-orm';
import {  pgTable,serial,char, primaryKey,integer, index,boolean,json,uniqueIndex,timestamp,unique,text,varchar, pgEnum, PgTable, uuid } from 'drizzle-orm/pg-core';
import { user } from '.';


export const rol = pgTable("rol", {
	id:uuid("id").primaryKey().defaultRandom(),
	rol: varchar("rol", { length: 255 }),
})

export const rolRelations=relations(rol,({one,many})=>({
    user:many(user)
}))
