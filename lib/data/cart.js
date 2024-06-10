'use server'
import {cartDetails, category, product } from "../../database/schemes";
import { eq, sql, sum,number, or, lte, not,gt,and,ne,asc,isNotNull,inArray } from "drizzle-orm";
import { alias } from "drizzle-orm/mysql-core";
import { cookies } from "next/headers";


import {db} from '../../database/db'
import { getUserSession } from "../auth";


export const getTotalPrice= async ()=>{
    const { rol, user } = await getUserSession();
    try{
        const totalPrice = await db.select({totalPrice: sql`sum(${cartDetails.quantity} * ${product.price})`,
    })
        .from(cartDetails)
        .innerJoin(product,eq(cartDetails.productId,product.id))
        .where(eq(cartDetails.cartId,user?.cartId))
        return {price:{...totalPrice[0]},cartId:user?.cartId}

    }catch(err){
        console.log(err);
        throw err;
    }

}



export const getCartItems= async ()=>{

    const { rol, user } = await getUserSession();


    try{
        const data= await db.query.cartDetails.findMany({
            where:eq(cartDetails.cartId,user?.cartId),
            with:{
                product:{
                    with:{
                        images:true
                    }
                },
                discount:true,
                configirationImage:true,
                device:true
               
            },
            orderBy:[asc(product.id)]
            
        })

        return data

    }catch(err){
        console.log(err);
        throw err;
    }
}

