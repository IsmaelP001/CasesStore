import {  pgTable,serial,char, primaryKey,integer,index,uniqueIndex,timestamp,unique, varchar, uuid, decimal, real, numeric, doublePrecision, check } from 'drizzle-orm/pg-core';
import { cart,product,color, discountCode, configurationimage, devices} from '.';
import { eq, relations, sql } from 'drizzle-orm';


export const cartDetails = pgTable("cartDetails", {
	id: serial("id").primaryKey().notNull(),
	cartId: uuid("cartId").references(() => cart.id, { onDelete: "cascade", onUpdate: "cascade" } ).notNull(),
	productId: uuid("productId").references(() => product.id, { onUpdate: "cascade" } ).notNull(),
	deviceId: uuid("deviceId").references(() => devices.id, { onDelete: "cascade", onUpdate: "cascade" } ).notNull(),
	quantity:integer('quantity').notNull().default(1).notNull(),
	colorId: uuid("colorId").references(() => color.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	configurationId:uuid('configurationId').references(()=>configurationimage.id),
	createdAt: timestamp('createdAt',{mode:'date'}).notNull().defaultNow(),
	updatedAt: timestamp('updatedAt',{mode:'date'}).notNull().defaultNow(),
},
(table) => {
	return {
		cartId: index("cartId").on(table.cartId),
		productId: index("productId").on(table.productId),
		colorId: index("colorId").on(table.colorId),

	}
});



export const cartDetailsRelations=relations(cartDetails,({one,many})=>({
    cart:one(cart,{
        fields:[cartDetails.cartId],
        references:[cart.id]
    }),
    product:one(product,{
        fields:[cartDetails.productId],
        references:[product.id]
    }),
    color:one(color,{
		fields:[cartDetails.colorId],
		references:[color.id]
	}),
	device:one(devices,{
		fields:[cartDetails.deviceId],
		references:[devices.id]
	}),
	image:one(configurationimage,{
		fields:[cartDetails.configurationId],
		references:[configurationimage.id]
	})

}))


