import { relations } from 'drizzle-orm';
import {  pgTable,serial,char, primaryKey,integer,index,uniqueIndex,timestamp,unique, varchar } from 'drizzle-orm/pg-core';
import { devices, product } from '.';

export const productDevices = pgTable("productDevices", {
	id: serial("id").primaryKey().notNull(),
	productId: integer('productId').notNull().references(()=>product.id,{onDelete:'cascade',onUpdate:'cascade'}),
    deviceId:integer('deviceId').notNull().references(()=>devices.id,{onDelete:'cascade',onUpdate:"cascade"})
},(table)=>{
    return {
        productDeviceUnique:unique().on(table.deviceId,table.productId)
    }
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


