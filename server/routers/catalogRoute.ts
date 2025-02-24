import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { productFilterSchema } from "@/lib/schemas/productFilterSchema";
import { catalogServiceFacade } from "../catalog/application/facade";
import { productSchema } from "@/lib/schemas/productSchema";
import { productTypeEnumValues } from "../catalog/domain/product.model";
import { unstable_cache } from "next/cache";


export const catalogRouter = router({
  getProducts: publicProcedure.input(productFilterSchema).query(async ({ input }) => {
    return await catalogServiceFacade.getAllProductsBy({ ...input });
  }),
  getProductsByType: publicProcedure.input(z.object({
    productType:z.enum(productTypeEnumValues)
  })).query(async ({ input }) => {
    return await catalogServiceFacade.getProductsByType(input.productType);
  }),
  getTopSalesProducts: publicProcedure.query(async ({ input }) => {
    return await catalogServiceFacade.getTopSalesProducts()
  }),
  createProduct: publicProcedure.input(productSchema.extend({
    images:z.array(z.string()).min(1,{message:'Minimo de una 1 imagen requerida'})
  })).mutation(async ({ input }) => {
    const {images,selectedProducts,...product}=input
    return await catalogServiceFacade.createProduct({product,selectedProducts,images})
  }),
  // updateProduct: publicProcedure.input(productSchema).mutation(async ({ input }) => {
  //   return await catalogServiceFacade.updateProduct(input)
  // }),
  getProductsById: publicProcedure
    .input(z.object({ id: z.coerce.string({ message: "Invalid product id" }) }))
    .query(async ({ input }) => {
      return await catalogServiceFacade.getProductById(input.id);
    }),
  getMostOrderedProducts: publicProcedure.query(async ({ input }) => {
    // const getMostOrderedProductQuery= unstable_cache(async()=>catalogServiceFacade.getMostOrderedProducts(),['MOST_ORDERED_PRODUCTS'])
    return await catalogServiceFacade.getMostOrderedProducts()
  }),
  getNewProducts: publicProcedure.query(async ({ input }) => {
    // const getNewProductsQuery= unstable_cache( async ()=>catalogServiceFacade.getNewProducts(),['NEW_PRODUCTS'])
    return await catalogServiceFacade.getNewProducts()
  }),
  getProductsBySearchCriteria: publicProcedure
    .input(
      z.object({
        query: z.string(),
      })
    )
    .query(async ({ input }) => {
      return await catalogServiceFacade.getProductsBySearchCriteria(
        input.query
      );
    }),
  getPrintPatterns: publicProcedure.query(async () => {
    return await catalogServiceFacade.getAllPrintPattern();
  }),
  getCollections: publicProcedure.input(z.object({
    limit:z.number().optional().nullable()
  }).optional()).query(async ({input}) => {
    // const getCollectionsQuery= unstable_cache( async()=>catalogServiceFacade.getAllCollections(),['COLLECTIONS'])
    return await catalogServiceFacade.getAllCollections(input as any)
  }),
  getColors: publicProcedure.query(async () => {
    return await catalogServiceFacade.getAllColors();
  }),
  getMaterials: publicProcedure.query(async () => {
    return await catalogServiceFacade.getAllMaterials();
  }),
  getDevices: publicProcedure.query(async () => {
    return await catalogServiceFacade.getAllDevices();
  }),
});
