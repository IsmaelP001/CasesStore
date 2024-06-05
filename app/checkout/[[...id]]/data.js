'use server'
import { address,defaultAddress, defaultGift, gift,user, }from "../../../database/schemes"
import { eq, sql, sum,number, or, lte, not,gt,and,ne,asc,isNotNull,inArray } from "drizzle-orm";

import { db } from "../../../database/db";
import { auth } from "../../../services/auth";


export const getUserData=async()=>{
    const {user:userData}= await auth();

    if(!userData){
        return redirect('/signin')
    }
    
    const currentUser = await db.query.user.findFirst({
        where:eq(user.id,userData.userId),
        
    })
    
    return currentUser;
}

export const getUserAddresses=async()=>{
    const {user:userData}= await auth();

    if(!userData){
        return redirect('/signin')
    }
    const addresses= await db.query.address.findMany({
        where:eq(address.userId,userData.userId)
    })

    return addresses
}



export const getDefaultAddress=async()=>{
    const {user:userData}= await auth();

    if(!userData){
        return redirect('/signin')
    }
    try{
        const address = await db.query.defaultAddress.findFirst({
            where:eq(defaultAddress.userId,userData.userId),
            with:{
                address:true
            }
        })

        return address || null
    }catch(err){
        console.log('ERROR GETTING DATA')
    }
}


export const getUserGift=async()=>{
    const {user:userData}= await auth();

    if(!userData){
        return redirect('/signin')
    }
    try{
        const gifts= await db.query.gift.findMany({
            where:eq(gift.userId,userData.userId)
        })
    
        return gifts
    }catch(err){
        console.log('error getting gift data',err)
        return false
    }
}



export const getDefaultGift=async()=>{
    const {user:userData}= await auth();

    if(!userData){
        return redirect('/signin')
    }
   try{
    const address = await db.query.defaultGift.findFirst({
        where:eq(defaultGift.userId,userData.userId),
        with:{
            gift:true
        }
    })

    return address ?? []
   }catch(err){
     console.log('error getting default gift data',err)
     return false

   }
}
