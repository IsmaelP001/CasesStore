import { CreateProduct, Product, ProductById, ProductFilters, ProductSearchCriteria, ProductsResponse, ProductTypeEnum } from "../domain/product.model";
import { Collection, FilterCollection } from "../domain/collection.model";
import { Color } from "../domain/color-model";
import { Material } from "../domain/material.model";
import { Devices } from "../domain/devices.model";
import { PrintPattern } from "../domain/printPattern-model";

export interface IProductService {
  getAll(ProductFilters:ProductFilters): Promise<ProductsResponse>;
  getById(productId: string): Promise<ProductById | null>
  getMostOrderedProducts(): Promise<Product[]>
  getNewProducts(): Promise<Product[]>
  getProductsBySearchCriteria(query:string): Promise<Product[]>
  createProduct(product:CreateProduct):Promise<Product>
  updateProduct(product:CreateProduct):Promise<CreateProduct[]>
  getTopSalesProducts(): Promise<Product[]>
  getProductsByType(productType:ProductTypeEnum):Promise<Product[]>
}



export interface ICollectionsService {
  getAllCollections(filter?:FilterCollection): Promise<Collection[]>;
}

export interface IColorsService {
  getAllColors(): Promise<Color[]>;
}

export interface IMaterialService {
  getAllMaterials(): Promise<Material[]>
}

export interface IDeviceService {
  getAllDevices(): Promise<Devices[]>
}

export interface IPrintPatternService {
  getAllPrintPattern(): Promise<PrintPattern[]>
}

