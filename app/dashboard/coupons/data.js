'use server'

import { address, cartDetails, category, color, defaultAddress, defaultGift, discountCode, gift, product, productDiscount, user, } from "../../../database/schemes";
import { eq, sql, sum,number, or, lte, not,gt,and,ne,asc,isNotNull,inArray, gte,lt } from "drizzle-orm";
import { alias } from "drizzle-orm/mysql-core";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { db } from "../../../database/db";



export const getActiveCoupons=async()=>{

    const currentDate = new Date()
    currentDate.setMinutes(currentDate.getMinutes() - currentDate.getTimezoneOffset())
    
    try{
        const data = await db.query.discountCode.findMany({
            where:and
            (
             gt(discountCode.expiresAt,currentDate),
             lt(discountCode.uses,discountCode.limit),
            ),
            with:{
                order:true,
                productDiscount:{
                    with:{
                        productDiscount:true
                    }
                }
            },
            orderBy:[asc(discountCode.createdAt)]
        })
    
        return data
    }catch(err){
        console.log(err)
    }
}


export const getExpiredCoupons = async () => {

    const currentDate = new Date()
    currentDate.setMinutes(currentDate.getMinutes() - currentDate.getTimezoneOffset())

    try {
        const data = await db.query.discountCode.findMany({
            where: or(
                lte(discountCode.expiresAt,currentDate),
                gte(discountCode.uses,discountCode.limit),
            ),
            with:{
                order:true,
                productDiscount:{
                    with:{
                        productDiscount:true
                    }
                }
            },
            orderBy:[asc(discountCode.createdAt)]
            //lte(discountCode.limit,discountCode.uses), excluye undefined=unlimited
        });
        console.log('expiredC',data)
        return data;

    } catch (err) {
        console.log(err);
    }
}



export const getAsociatedProductsToCoupons=async()=>{

//    const data = await db.select().from(discountCode)
//    .innerJoin(productDiscount,eq(productDiscount.discountId,discountCode.id))
//    .innerJoin(product,eq(productDiscount.productId,product.id))
//    .where(discountCode.id,39);


   const data = await db.query.discountCode.findMany({
     with:{
        product:true
     }
   })

   return data
}


