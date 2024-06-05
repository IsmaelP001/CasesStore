"use server";

import { address, cart, cartDetails, defaultAddress, defaultGift, discountCode, gift, productDiscount, user } from "../../../database/schemes";
import { eq ,and, AnyColumn, sql, ne} from "drizzle-orm";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/dist/server/api-utils";
import { object } from "zod"; 
import { generateToken } from "../../../services/auth";
import { db } from "../../../database/db";



export const createCoupon=async(allProductIds,FormData)=>{
  const allProducts=FormData?.getAll('allProducts')[0] === 'true' ? true : false


  // const result= addCoupomScheme.safeParse({
  //   ...Object.fromEntries(FormData.entries()),
  //   productIds:allProductIds.length > 0 ? allProductIds : undefined,
  //   allProducts,
  // })

  console.log('resultError',result.error)

 


  if(result.success === false) return result.error.formErrors.fieldErrors

  const data= result.data

  try{
    const [newTicket]=await db.insert(discountCode).values({
      code:data.code,
      discountAmount:data.discountAmount,
      discountType:data.discountType,
      allProducts:data.allProducts,
      productIds:data.productIds,
      expiredAt:data.expiresAt,
      limit:data.limit
    })

    const discountId=newTicket?.insertId;

    const productDiscountValues=allProductIds.map(item=>{
      return {discountId,productId:item}
    });

    await db.insert(productDiscount).values(productDiscountValues)

  

  }catch(err){
    console.log(err)
    return false
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
    console.log(id)
    return true
  }catch(err){
    console.log('error deleting coupon',err)
    return false
  }

}
