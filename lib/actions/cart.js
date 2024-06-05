"use server";

import { address, cart, cartDetails, defaultAddress, defaultGift, discountCode, gift, productDiscount, user } from "../../database/schemes"
import { eq ,and, AnyColumn, sql, ne} from "drizzle-orm";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from 'uuid';
import {auth} from '../../services/auth'
import { db } from '../../database/db'


export const addCartItem = async (FormData) => {

    const data = Object.fromEntries(FormData)
    let cartId = cookies().get('cartId')?.value
    const {user:userData}= await auth();
    
   try{
    if(userData?.userId && !cartId){
        const currentUserCart = await db.query.cart.findFirst({
            columns:{
                id:true
            },
            where:(eq(cart.userId,userData.userId))
        })

        cartId=currentUserCart.id
    }


    if(!cartId && !userData?.userId){
        const newCartId=uuidv4();
        const res=await db.insert(cart).values({id:newCartId}).returning({id:cart.id});
        cartId=res[0].id;
        cookies().set('cartId',cartId)
        return
    }

    await db.insert(cartDetails).values({cartId,userId:user.userId,...data})
       
   }catch(err){
    console.log('error',err)
   }
  
  };
  
  export const updateCartQuantity= async({cartId,quantity,productId})=>{
      await db.update(cartDetails).set({quantity:quantity}).where(and(eq(cartDetails.cartId,cartId),eq(cartDetails.productId,productId)))
      return {quantity};
  }
  
  export const removeCartItem= async({id})=>{
      await db.delete(cartDetails).where(eq(cartDetails.id,id))
      return {isDeleted:true};
  }

  export const generateCartId=async(userId=null)=>{
    try{
        return true;
    }catch(err){
        console.log('err',err)
        return false;
    }
  }
  