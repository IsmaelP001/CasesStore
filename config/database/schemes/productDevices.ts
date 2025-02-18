import { relations } from 'drizzle-orm';
import {  pgTable,serial,char, primaryKey,integer,index,uniqueIndex,timestamp,unique, varchar, uuid } from 'drizzle-orm/pg-core';
import { devices, product } from '.';

export const productDevices = pgTable("productDevices", {
	id: uuid("id").primaryKey().defaultRandom(),
	productId: uuid('productId').notNull().references(()=>product.id,{onDelete:'cascade',onUpdate:'cascade'}),
    deviceId:uuid('deviceId').notNull().references(()=>devices.id,{onDelete:'cascade',onUpdate:"cascade"}),
    inStock:integer('inStock').notNull().default(1),
},(table)=>{
    return {
        // productDeviceUnique:unique('unique_device_product').on(table.deviceId,table.productId)
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


