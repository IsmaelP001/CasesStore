"use server";
import { db } from "../../../database/db";
import {
  cartDetails,
  collection,
  compatibleProduct,
  material,
  printPattern,
  product,
  productImages,
} from "../../../database/schemes";
import {
  eq,
  like,
  sql,
  sum,
  number,
  or,
  lte,
  not,
  gt,
  and,
  ne,
  asc,
  isNotNull,
  inArray,
} from "drizzle-orm";




export const getCollections=async ()=>{
   try{
    const categories=await db.query.collection.findMany()
    return categories || []
   }catch(err){
    return {error:'error'}
   }
}

export const getColors=async ()=>{
    const colors=await db.query.color.findMany()
    return colors || []
}

export const getMaterials=async ()=>{
    const materials=await db.query.material.findMany()
    return materials || []
}

export const getPrintPatterns=async ()=>{
    const printPatterns=await db.query.printPattern.findMany()
    return printPatterns || []
}

export const getCompatibleProducts=async ()=>{
  const devices=await db.query.devices.findMany()
  return devices || []
}

