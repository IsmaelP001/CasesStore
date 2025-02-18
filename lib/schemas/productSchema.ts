import { productTypeEnumValues } from "@/server/catalog/domain/product.model";
import { z } from "zod";
import { zfd } from "zod-form-data";

export const productSchema = z.object({
  name: z
    .string({message:"Introduzca un nombre"})
    .min(3, { message: "El nombre debe tener al menos 3 letras" })
    .regex(/^[a-zA-Z\s]+$/, { message: "El nombre solo puede tener letras" }),
  price: z.coerce.number({ message: "Añada un precio al producto" }),
  stock: z.coerce.number({ message: "Defina cantidad en almazen disponible" }),
  productType:z.enum(productTypeEnumValues,{message:"Seleccione el tipo de producto"}),
  printPatternId: z.coerce.string({
    message: "Seleccione un patron de diseño",
  }),
  materialId: z.coerce.string({
    message: "Seleccione un tipo de material",
  }),
  collectionId: z.coerce.string({ message: "Seleccione una coleccion" }),
  colorId: z.coerce.string({ message: "Seleccione un color" }),
  isConfigurable: z.coerce.boolean(),
  selectedProducts: z
    .array(z.any())
});
