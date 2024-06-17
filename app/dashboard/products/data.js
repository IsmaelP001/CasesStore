"use server";
import {
  cartDetails,
  collection,
  color,
  compatibleProduct,
  devices,
  material,
  printPattern,
  product,
  productDevices,
  productImages,
} from "../../database/schemes";
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
import { cookies } from "next/headers";

import { db } from "../../database/db";
export const getProducts = async (type = "", params) => {
  const materialParams = params?.material?.split('%') ?? [];
  const colorParams = params?.color?.split('%') ?? [];
  const collectionParams = params?.collection?.split('%') ?? [];
  const patternParams = params?.pattern?.split('%') ?? [];

  try {
    const data = await db
      .selectDistinctOn([product.id])
      .from(product)
      .innerJoin(
        productDevices,
        eq(productDevices.productId, product.id)
      )
      .innerJoin(devices,eq(productDevices.deviceId,devices.id))
      .innerJoin(productImages, eq(productImages.productId, product.id))
      .innerJoin(collection, eq(collection.id, product.collectionId))
      .innerJoin(material, eq(material.id, product.materialId))
      .innerJoin(printPattern, eq(printPattern.id, product.printPatternId))
      .innerJoin(color, eq(color.id, product.colorId))
      .where(
        and(
          like(devices.name, `%${type}%`),
          collectionParams.length ? inArray(collection.name, collectionParams) : true,
          patternParams.length ? inArray(printPattern.name, patternParams) : true,
          colorParams.length ? inArray(color.name, colorParams) : true,
          materialParams.length ? inArray(material.name, materialParams) : true
        )
      )
      .orderBy(product.id)
  
  
    const newData = data.map((item) => {
      const { products, ...rest } = item;
      return { ...products, ...rest };
    });
  
  
    return newData;
  } catch (error) {
    // Handle any potential errors here
    console.error("Error fetching products:", error);
    throw error; // Rethrow the error or handle it gracefully based on your application's requirements
  }
  

};