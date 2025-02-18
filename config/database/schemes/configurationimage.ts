import { relations } from 'drizzle-orm';
import {  pgTable,pgEnum,serial,char, primaryKey,integer,index,uniqueIndex,timestamp,unique,text,varchar, uuid } from 'drizzle-orm/pg-core';
import {  cartDetails } from '.';

export const modelEnum=pgEnum("model", ['iphonex','iphone11','iphone12','iphone13','iphone14','iphone15'])
export const materialEnum=pgEnum("material", ['silicone','polycarbonate'])
// export const caseFinish=pgEnum("finish", ['smooth','textured'])
// export const caseColor=pgEnum("color", ['black','blue','rose'])


export const configurationimage = pgTable("configurationimage", {
	id: uuid("id").primaryKey().defaultRandom(),
	width:integer('width').notNull(),
	height: integer("height").notNull(),
  imageUrl: text("image_url").notNull(),
	createdAt: timestamp('created_at',{mode:'date'}).notNull().defaultNow(),
	updatedAt: timestamp('updated_at',{mode:'date'}).notNull().defaultNow(),
});



export const configurationImageRelations=relations(configurationimage,({many,one})=>({
	cartDetails:many(cartDetails),
	
}))