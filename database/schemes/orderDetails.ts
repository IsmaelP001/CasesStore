import {  pgTable,serial,char, primaryKey,integer, index,boolean,json,uniqueIndex,timestamp,unique,text,varchar, pgEnum } from 'drizzle-orm/pg-core';
import { order,product,color,discountCode, configurationimage, devices} from './';
import { relations } from 'drizzle-orm';

export const orderDetails = pgTable("orderDetails", {
	id: serial("id").primaryKey().notNull(),
	orderId: char("orderId", { length: 36 }).references(() => order.id, { onDelete: "cascade" } ),
	productId: integer("productId").references(() => product.id),
	deviceId: integer("deviceId").references(() => devices.id, { onDelete: "cascade", onUpdate: "cascade" } ).notNull(),
	quantity:integer('quantity').notNull().default(1),
	colorId: integer("colorId").references(() => color.id, { onDelete: "set null", onUpdate: "cascade" } ),
	discountId:integer('discountId').references(()=>discountCode.id,{onDelete:'set null',onUpdate:"cascade"}),
	configurationId:varchar('configurationId',{length:50}).references(()=>configurationimage.id,{onDelete:'set null',onUpdate:"cascade"}),
	createdAt: timestamp('createdAt',{mode:'date'}).notNull().defaultNow(),
	updatedAt: timestamp('updatedAt',{mode:'date'}).notNull().defaultNow(),
});


export const orderDetailsRelations=relations(orderDetails,({one,many})=>({
    order:one(order,{
        fields:[orderDetails.orderId],
        references:[order.id]
    }),
    product:one(product,{
        fields:[orderDetails.productId],
        references:[product.id]
    }),
	color:one(color,{
		fields:[orderDetails.colorId],
		references:[color.id]
	}),
	discount:one(discountCode,{
		fields:[orderDetails.discountId],
		references:[discountCode.id]
	}),
	configirationImage:one(configurationimage,{
		fields:[orderDetails.configurationId],
		references:[configurationimage.id]
	}),
	device:one(devices,{
		fields:[orderDetails.deviceId],
		references:[devices.id]
	})

}))

