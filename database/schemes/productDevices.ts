import { relations } from 'drizzle-orm';
import {  pgTable,serial,char, primaryKey,integer,index,uniqueIndex,timestamp,unique, varchar } from 'drizzle-orm/pg-core';
import { devices, product } from '.';

export const productDevices = pgTable("productDevices", {
	id: serial("id").primaryKey().notNull(),
	productId: integer('productId').notNull().references(()=>product.id),
    deviceId:integer('deviceId').notNull().references(()=>devices.id)
});


export const productDevicesRelations=relations(productDevices,({one})=>({
    product:one(product,{
        fields:[productDevices.productId],
        references:[product.id]
    }),
    devices:one(devices,{
        fields:[productDevices.deviceId],
        references:[devices.id]
    })
}))


