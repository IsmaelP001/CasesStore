import {  pgTable,serial,char, primaryKey,integer, index,boolean,json,uniqueIndex,timestamp,unique,text,varchar, pgEnum, uuid } from 'drizzle-orm/pg-core';
import { order,product,color,discountCode, configurationimage, devices} from '.';
import { relations } from 'drizzle-orm';

export const orderDetails = pgTable("orderDetails", {
	id: serial("id").primaryKey().notNull(),
	productId: uuid("product_id").references(() => product.id),
	deviceId: uuid("device_id").references(() => devices.id, { onDelete: "cascade", onUpdate: "cascade" } ).notNull(),
	quantity:integer('quantity').notNull().default(1),
	colorId: uuid("color_id").references(() => color.id, { onDelete: "set null", onUpdate: "cascade" } ),
	orderId: uuid("order_id").references(() => order.id, { onDelete: "set null", onUpdate: "cascade" } ),
	configurationId:uuid('configuration_id').references(()=>configurationimage.id,{onDelete:'set null',onUpdate:"cascade"}),
	createdAt: timestamp('created_at',{mode:'date'}).notNull().defaultNow(),
	updatedAt: timestamp('updated_at',{mode:'date'}).notNull().defaultNow(),
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
	configirationImage:one(configurationimage,{
		fields:[orderDetails.configurationId],
		references:[configurationimage.id]
	}),
	device:one(devices,{
		fields:[orderDetails.deviceId],
		references:[devices.id]
	})

}))

