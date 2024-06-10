"use server";

import { address, cart, cartDetails, defaultAddress, defaultGift, discountCode, gift, productDiscount, user as userTable } from "../../../database/schemes"
import { eq ,and, AnyColumn, sql, ne} from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "../../../database/db";
import { getUserSession } from "../../../lib/auth";
import {phonenumberSchema} from '../../../lib/schemas/phonenumberSchema'

export const createNewAddress=async(FormData)=>{
    const data = Object.fromEntries(FormData)
    const {user}= await getUserSession() || {}

    if(!user){
      return redirect('/auth/signin')
    }

    try{
      await db.insert(address).values({...data,userId:user?.id})
    }catch(err){
      console.log('error',err)
    }
  }
  
  
  
  export const updateDefaultAddress=async({addressId})=>{
    const {user}= await getUserSession() || {}

    if(!user){
      return redirect('/auth/signin')
    }


    try{
      await db.insert(defaultAddress)
      .values({ addressId, userId:user?.id}).returning()
      
    }catch(err){
      return false
    }
  }
  
  export const updateAddress=async(FormData)=>{
    const newAddress=Object.fromEntries(FormData);
    const {user}= await getUserSession() || {}

    if(!user){
      return redirect('/auth/signin')
    }
    try{
      await db.update(address).set({...newAddress}).where(eq(address.id,newAddress.addressId))
      return true;
    }catch(err){
      return false;
    }
  }
  
  export const deleteAddress=async({addressId})=>{
    const {user}= await getUserSession()|| null

    if(!user){
      return redirect('/auth/signin')
    }
    try{
      await db.delete(address).where(and(eq(address.id,addressId),eq(address.userId,user?.id)));
    }catch(err){
      console.log('error deleting address',err)
    }
  }
  
  
  export const createNewGift=async(FormData)=>{
    const data = Object.fromEntries(FormData)
    const {user}= await getUserSession() || null

    if(!user){
      return redirect('/auth/signin')
    }
    try{
      await db.insert(gift).values({...data,userId:user?.id})
    }catch(err){
      console.log('error',err)
    }
  }
  
  export const updateGiftInfo=async(FormData)=>{

    const newGiftInfo=Object.fromEntries(FormData);
    const {user}= await getUserSession() || null

    if(!user){
      return redirect('/auth/signin')
    }
    try{
      await db.update(gift).set({...newGiftInfo}).where(eq(gift.id,newGiftInfo.giftId))
      return true
    }catch(err){
      console.log('error',err)
      return false;
    }
  }
  
  
  export const updateDefaultGift=async({giftId,userId})=>{

    const {user}= await getUserSession() || null

    if(!user){
      return redirect('/auth/signin')
    }
    try{
      await db.insert(defaultGift)
      .values({ giftId, userId:user?.id})
      // .onDuplicateKeyUpdate({ set: { giftId } });    
      return true
    }catch(err){
      console.log('errr default gift',err)
      return false
    }
  }
  
  export const deleteGift=async({giftId,userId})=>{
    const {user}= await getUserSession() || null

    if(!user){
      return redirect('/auth/signin')
    }
    try{
      await db.delete(gift).where(and(eq(gift.id,giftId),eq(gift.userId,user?.id)));
    }catch(err){
      console.log('error deleting address',err)
    }
  }
  

  
  export const updatePhoneNumber=async(FormData)=>{
    const {phonenumber}=Object.fromEntries(FormData)
    const {user}= await getUserSession() || {}
    
    if(!user){
      return redirect('/auth/signin')
    }
    const phonenumberParsed= phonenumberSchema.parse(phonenumber)

    try{
      await db.update(userTable).set({phonenumber:phonenumberParsed}).where(eq(userTable.id,user?.id))
      return true
    }catch(err){
      console.log('error updating phone number',err)
      return false
    }
  }




export const applyCouponToCart=async (cartItemIds,FormData)=>{
    const code=FormData.get('code');
    let applicableProduct=null
    try{
  
      const coupon= await db.query.discountCode.findFirst({
        where:eq(discountCode.code,code)
      });
  
  
      console.log('codeIds',coupon?.productIds)
      console.log('code',coupon)
      console.log('cartItemsIds',cartItemIds)
  
  
      if(!coupon) throw {isError:true,message:'Coupon no existe'};
  
  
      if(!coupon.allProducts && coupon.productIds){
         applicableProduct=cartItemIds?.find(product=>coupon.productIds.includes(product.productId)) ?? null;
      }
  
      if(!applicableProduct && !coupon.allProducts) return {isError:true,message:'coupon no valido para estos productos'}
  
      const result= await db.update(cartDetails).set({discountId:coupon.id}).where(eq(cartDetails.id,applicableProduct.cartDetailsId))
      
      console.log('resut',result)
      
  
    }catch(err){
      if(err.code === 'ER_DUP_ENTRY') return {isError:true,message:'Este coupon ya ha sido aplicado'}
      return err
    }
  }