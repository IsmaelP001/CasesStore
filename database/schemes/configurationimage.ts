import { relations } from 'drizzle-orm';
import {  pgTable,pgEnum,serial,char, primaryKey,integer,index,uniqueIndex,timestamp,unique,text,varchar, uuid } from 'drizzle-orm/pg-core';
import { cartDetails } from './';
import { v4 as uuidv4 } from 'uuid';

export const modelEnum=pgEnum("model", ['iphonex','iphone11','iphone12','iphone13','iphone14','iphone15'])
export const materialEnum=pgEnum("material", ['silicone','polycarbonate'])
// export const caseFinish=pgEnum("finish", ['smooth','textured'])
// export const caseColor=pgEnum("color", ['black','blue','rose'])


export const configurationimage = pgTable("configurationimage", {
	id: varchar("id",{length:50}).primaryKey().notNull().$defaultFn(()=>uuidv4()),
	width:integer('width').notNull(),
	height: integer("height").notNull(),
    imageUrl: text("imageUrl").notNull(),
	material:materialEnum('material'),
	model:modelEnum('model'),
	createdAt: timestamp('createdAt',{mode:'date'}).notNull().defaultNow(),
	updatedAt: timestamp('updatedAt',{mode:'date'}).notNull().defaultNow(),
});



// export const colorRelations=relations(color,({many,one})=>({
// 	productToColor:many(productColors),
// 	cartDetais:one(cartDetails,{
// 		fields:[color.id],
// 		references:[cartDetails.colorId]
// 	})
// }))