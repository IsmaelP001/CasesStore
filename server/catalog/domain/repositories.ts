import { CreateProduct, MostOrderedProductQuery, Product, ProductById, ProductFilters, ProductSearchCriteria, ProductTypeEnum} from "../domain/product.model";
import { Devices } from "./devices.model";
import { Color } from "../domain/color-model";
import { Material } from "../domain/material.model";
import { Collection, FilterCollection } from "./collection.model";
import { PrintPattern } from "./printPattern-model";

export interface IProductRepository {
  getProducts( filter: ProductFilters): Promise<Product[]>;
  getProductById(productId: string): Promise<ProductById | null>
  getMostOrderedProducts(param:MostOrderedProductQuery): Promise<Product[]>
  getNewProducts(): Promise<Product[]>
  getProductsBy(query:string): Promise<ProductSearchCriteria[]>
  createProduct(product:CreateProduct):Promise<Product>
  getProductsByType(productType:ProductTypeEnum):Promise<Product[]>
  // updateProduct(product:CreateProduct):Promise<CreateProduct[]>
}

  
export interface IDevicesRepository {
  getAllDevices(): Promise<Devices[]>;
}


export interface IColorsRepository {
  getAllColors(): Promise<Color[]>;
}


export interface IMaterialRepository {
  getAllMaterials(): Promise<Material[]>; 
}

export interface ICollectionRepository {
  getAllCollections(filter?:FilterCollection): Promise<Collection[]>; 
}

export interface IPrintPatternRepository {
  getAllPrintPattern():Promise<PrintPattern[]>
}

