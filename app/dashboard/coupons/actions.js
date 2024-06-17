"use server";

import { address, cart, cartDetails, defaultAddress, defaultGift, discountCode, gift, productDiscount, user } from "../../../database/schemes";
import { eq ,and, AnyColumn, sql, ne} from "drizzle-orm";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/dist/server/api-utils";
import { object } from "zod"; 
import { generateToken } from "../../../services/auth";
import { db } from "../../../database/db";
import { addCoupomScheme } from "../../../lib/schemas/couponScheme";


export const createCoupon=async(productIds,FormData)=>{
  const data = Object.fromEntries(FormData)
  const expiresAt = new Date(data.expiresAt)
  expiresAt.setMinutes(expiresAt.getMinutes() - expiresAt.getTimezoneOffset())
  
  const result= addCoupomScheme.safeParse({
    ...Object.fromEntries(FormData.entries()),
    expiresAt,
    productIds
  })

 
  if (!result.success)
    return { _error: result?.error?.formErrors?.fieldErrors };

  
  try{

    const isCouponExist = await db.query.discountCode.findFirst({where:eq(discountCode.code,result?.data?.code)})

    if(isCouponExist) return {_error:['Nombre del coupon ya existe']}

    const [newTicket]=await db.insert(discountCode).values({...result.data}).returning();
    
    if(result?.data?.productIds?.length > 0){
      const discountId=newTicket?.id;
      const productDiscountValues=result.data.productIds.map(item=>{
        return {discountId,productId:item}
      });
      await db.insert(productDiscount).values(productDiscountValues)
    }

  }catch(err){
    console.log('error',err)
    // throw new Error('error al crear coupon')
  }
}


export const activeToogleCoupons=async(id,isActive)=>{

 try{
  await db.update(discountCode).set({isActive}).where(eq(discountCode.id,id))
  return true;
 }catch(err){
  console.log('error updating coupon',err)
  return false
 }

}


export const deleteCoupon=async(id)=>{

  try{
    await db.delete(discountCode).where(eq(discountCode.id,id))
    return true
  }catch(err){
    console.log('error deleting coupon',err)
    return false
  }

}
