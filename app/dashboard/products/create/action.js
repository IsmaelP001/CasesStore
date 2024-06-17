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
const utapi = new UTApi();

const createProductSchema = z.object({
  name: z
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
    .min(1, { message: "Debe haber al menos una imagen" }),
});

export const createProduct = async ({
  productData,
  imagesData,
  selectedProducts,
}) => {
  const allFiles = imagesData.getAll("files");
  const images = Array.from(imagesData);
  const result = createProductSchema.safeParse({
    ...productData,
    allFiles,
    selectedProducts,
  });

  if (!result.success)
    return { _error: result?.error?.formErrors?.fieldErrors };

  const {
    selectedProducts: parsedSelectedProducts,
    allFiles: parsedAllFiles,
    ...parsedProductData
  } = result?.data || [];

  try {
    const [newProduct, res] = await Promise.all([
      db.insert(product).values(parsedProductData).returning(),
      utapi.uploadFiles(parsedAllFiles),
    ]);
    if (!newProduct) throw new Error("Error al insertar producto");

    const images = res?.map((resData) => {
      return { productId: newProduct[0]?.id, image: resData?.data?.url };
    });

    if (!res.length > 0) throw new Error("Error al subir imagenes");

    const newProductDevices = parsedSelectedProducts.map((deviceId) => ({
      productId: newProduct[0]?.id,
      deviceId,
    }));
    await Promise.all([
      db.insert(productImages).values(images),
      db.insert(productDevices).values(newProductDevices),
    ]);
  } catch (error) {
    console.log("err", error);
  }
};
