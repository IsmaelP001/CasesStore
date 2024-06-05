import {  pgTable,serial,char, primaryKey,integer,index,uniqueIndex,timestamp,unique, varchar } from 'drizzle-orm/pg-core';
import { cart,product,color, discountCode, configurationimage, devices} from './';
import { relations } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';


export const cartDetails = pgTable("cartDetails", {
	id: serial("id").primaryKey().notNull(),
	cartId: char("cartId", { length: 36 }).references(() => cart.id, { onDelete: "cascade", onUpdate: "cascade" } ).notNull(),
	productId: integer("productId").references(() => product.id, { onDelete: "cascade", onUpdate: "cascade" } ).notNull(),
	deviceId: integer("deviceId").references(() => devices.id, { onDelete: "cascade", onUpdate: "cascade" } ).notNull(),
	quantity:integer('quantity').notNull().default(1).notNull(),
	colorId: integer("colorId").references(() => color.id, { onDelete: "cascade", onUpdate: "cascade" } ).notNull(),
	discountId:integer('discountId').references(()=>discountCode.id,{onDelete:'set null',onUpdate:"cascade"}),
	configurationId:varchar('configurationId',{length:50}).references(()=>configurationimage.id,{onDelete:'set null',onUpdate:"cascade"}),
	createdAt: timestamp('createdAt',{mode:'date'}).notNull().defaultNow(),
	updatedAt: timestamp('updatedAt',{mode:'date'}).notNull().defaultNow(),
},
(table) => {
	return {
		cartId: index("cartId").on(table.cartId),
		productId: index("productId").on(table.productId),
		colorId: index("colorId").on(table.colorId),
		cartProduct:index('cart_product_unique').on(table.cartId,table.quantity),
		uniqueProductColor:unique().on(table.cartId,table.productId,table.colorId,table.configurationId),
		uniqueDiscountInCart:unique().on(table.cartId,table.discountId),
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
	discount:one(discountCode,{
		fields:[cartDetails.discountId],
		references:[discountCode.id]
	}),
	configirationImage:one(configurationimage,{
		fields:[cartDetails.configurationId],
		references:[configurationimage.id]
	}),
	device:one(devices,{
		fields:[cartDetails.deviceId],
		references:[devices.id]
	})

}))


