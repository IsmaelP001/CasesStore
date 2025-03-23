'use server'
import { catalogServiceFacade } from "../catalog/application/facade";

export const getProducts = async (input:any) => {
    return await catalogServiceFacade.getAllProductsBy({ ...input });
  };
  
  export const getProductsByType = async (productType:any) => {
    return await catalogServiceFacade.getProductsByType(productType);
  };
  
  export const getTopSalesProducts = async () => {
    return await catalogServiceFacade.getTopSalesProducts();
  };
  
  export const createProduct = async (
    input:any
  ) => {
    const { images, selectedProducts, ...product } = input;
    return await catalogServiceFacade.createProduct({ product, selectedProducts, images });
  };
  
  export const getProductsById = async (id: string) => {
    return await catalogServiceFacade.getProductById(id);
  };
  
  export const getMostOrderedProducts = async () => {
    return await catalogServiceFacade.getMostOrderedProducts();
  };
  
  export const getNewProducts = async () => {
    return await catalogServiceFacade.getNewProducts();
  };
  
  export const getProductsBySearchCriteria = async (query: string) => {
    return await catalogServiceFacade.getProductsBySearchCriteria(query);
  };
  
  export const getPrintPatterns = async () => {
    return await catalogServiceFacade.getAllPrintPattern();
  };
  
  export const getCollections = async (limit?: number ) => {
    return await catalogServiceFacade.getAllCollections({limit});
  };
  
  export const getColors = async () => {
    return await catalogServiceFacade.getAllColors();
  };
  
  export const getMaterials = async () => {
    return await catalogServiceFacade.getAllMaterials();
  };
  
  export const getDevices = async () => {
    return await catalogServiceFacade.getAllDevices();
  };