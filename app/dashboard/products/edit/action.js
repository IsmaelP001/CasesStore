"use server";
import { UTApi } from "uploadthing/server";
import { db } from "../../../../database/db";
import {
  collection,
  product,
  productDevices,
  productImages,
} from "../../../../database/schemes";
import { z } from "zod";
import { and, eq, notInArray } from "drizzle-orm";
const utapi = new UTApi();

const updateProductSchema = z.object({
  
  productId: z.coerce.number({
    message: "El id del producto no puede estar vacio",
  })
  ,name: z
    .string("Introduzca un nombre")
    .min(3, { message: "El nombre debe tener al menos 3 letras" })
    .regex(/^[a-zA-Z\s]+$/, { message: "El nombre solo puede tener letras" }),
  price: z.coerce.number({ message: "Añada un precio al producto" }),
  stock: z.coerce.number({ message: "Defina cantidad en almazen disponible" }),
  printPatternId: z.coerce.number({
    message: "Seleccione un patron de diseño",
  }),
  materialId: z.coerce.number({
    message: "Seleccione un tipo de material",
  }),
  collectionId: z.coerce.number({ message: "Seleccione una coleccion" }),
  colorId: z.coerce.number({ message: "Seleccione un color" }),
  isConfigurable: z.coerce.boolean(),
  selectedProducts: z
    .array(z.any())
    .min(1, { message: "Debe haber al menos un producto seleccionado" }),
  allFiles: z
      .array(z.any())
      .optional()
});

export const updateProduct = async ({
  productData,
  imagesData,
  selectedProducts,
}) => {
  const allFiles = imagesData.getAll("files");
  const result = updateProductSchema.safeParse({
    ...productData,
    allFiles,
    selectedProducts,
    
  });

  console.log('productData',productData)
  console.log('selectedProducts',selectedProducts)
  console.log('parsedDat',result?.data)
  console.log('parsedDat',result?.error?.format())


  if (!result.success)
    return { _error: result?.error?.formErrors?.fieldErrors };

  
  const {
    selectedProducts: parsedSelectedProducts,
    allFiles: parsedAllFiles,
    productId,
    ...parsedProductData
  } = result?.data || [];

  try {
    
    const [updatedProduct]= await db.update(product).set({...parsedProductData,updatedAt:new Date()}).where(eq(product.id,productId)).returning({id:product.id})

    if (!updatedProduct) throw new Error("Error al insertar producto");

    const newProductDevices = parsedSelectedProducts.map((deviceId) => ({
      productId:updatedProduct?.id,
      deviceId,
    }));

    await db.delete(productDevices).where(and(eq(productDevices.productId,updatedProduct?.id),notInArray(productDevices.productId,selectedProducts)))
    await db.insert(productDevices).values(newProductDevices).onConflictDoNothing()
    
    if(parsedAllFiles.length>0){
      const res = await utapi.uploadFiles(parsedAllFiles)
      const images = res?.map((resData) => {
        return { productId: updatedProduct?.id, image: resData?.data?.url };
      });
  
      if (!res.length > 0) throw new Error("Error al subir imagenes");
  
      await  db.insert(productImages).values(images)
    }

  } catch (error) {
    console.log("err", error);
  }
};


export const deleteImage =async (id)=>{

  try{

    await db.delete(productImages).where(eq(productImages.id,id))
  }catch(err){
    console.log('error al eliminar imagen')
  }
}