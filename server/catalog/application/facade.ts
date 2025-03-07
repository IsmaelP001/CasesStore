import { getUserSession } from "@/lib/auth";
import { Collection, FilterCollection } from "../domain/collection.model";
import { Color } from "../domain/color-model";
import { Devices } from "../domain/devices.model";
import { Material } from "../domain/material.model";
import {
  CreateProduct,
  Product,
  ProductById,
  ProductFilters,
  ProductSearchCriteria,
  ProductTypeEnum,
} from "../domain/product.model";
import { defaultCollectionService } from "./collection-service";
import { DefaultColorService } from "./colors-services";
import { defaultDeviceService } from "./devices-services";
import { DefaultMaterialService } from "./material-services";
import { defaultprintPatternService } from "./printPattern-service";
import { defaultProductService } from "./product-service";
import {
  ICollectionsService,
  IColorsService,
  IDeviceService,
  IMaterialService,
  IPrintPatternService,
  IProductService,
} from "./service.definitions";
import { handleError } from "@/server/shared/utils/errors";

class CatalogsServiceFacadeImpl {
  constructor(
    private productService: IProductService,
    private colorsService: IColorsService,
    private materialService: IMaterialService,
    private collectionsService: ICollectionsService,
    private deviceService: IDeviceService,
    private printPatternService: IPrintPatternService
  ) {}

  async getAllProductsBy(filter: ProductFilters): Promise<Product[]> {
    try {
      return await this.productService.getAll({ ...filter });
    } catch (error) {
      console.log("error products", error);
      throw new Error("error al obtener productos");
    }
  }

  createProduct(product: CreateProduct): Promise<Product> {
    try {
      return this.productService.createProduct(product);
    } catch (error) {
      console.log('err product',error)
      handleError(error);
    }
  }

  updateProduct(product: CreateProduct): Promise<CreateProduct[]> {
    try {
      return this.updateProduct(product);
    } catch (error) {
      handleError(error);
    }
  }

  async getProductById(productId: string): Promise<ProductById | null> {
    try {
      const data = await this.productService.getById(productId);
      return data;
    } catch (error) {
      throw new Error("error al obtener producto" + error);
    }
  }

  async getProductsByType(productType: ProductTypeEnum): Promise<Product[]> {
    try {
      return await this.productService.getProductsByType(productType)

    } catch (error) {
      handleError(error)
    }
  }

  async getMostOrderedProducts(): Promise<Product[]> {
    try {
      return await this.productService.getMostOrderedProducts();

    } catch (error) {
      console.log('err getMostOrderedProducts',error)
      handleError(error)
    }
  }

  async getTopSalesProducts(): Promise<Product[]> {
    try {
      return await this.productService.getMostOrderedProducts();

    } catch (error) {
      handleError(error)
    }
  }
  async getNewProducts(): Promise<Product[]> {
    try {
      return await this.productService.getNewProducts();
    } catch (error) {
      console.log('err getting new products')
      handleError(error)
    }
  }

  async getProductsBySearchCriteria(
    query: string
  ): Promise<ProductSearchCriteria[]> {
    return this.productService.getProductsBySearchCriteria(query);
  }

  async getAllColors(): Promise<Color[]> {
    try {
      return await this.colorsService.getAllColors();
    } catch (error) {
      console.log("error products", error);
      throw new Error("error al obtener productos");
    }
  }

  async getAllMaterials(): Promise<Material[]> {
    try {
      return await this.materialService.getAllMaterials();
    } catch (error) {
      console.log("error products", error);
      throw new Error("error al obtener productos");
    }
  }

  async getAllCollections(filter?:FilterCollection): Promise<Collection[]> {
    try {
      return await this.collectionsService.getAllCollections(filter);
    } catch (error) {
      throw new Error("error al obtener productos");
    }
  }

  async getAllDevices(): Promise<Devices[]> {
    try {
      return await this.deviceService.getAllDevices();
    } catch (error) {
      console.log("error products", error);
      throw new Error("error al obtener productos");
    }
  }

  async getAllPrintPattern(): Promise<Devices[]> {
    try {
      return await this.printPatternService.getAllPrintPattern();
    } catch (error) {
      console.log("error products", error);
      throw new Error("error al obtener productos");
    }
  }
}

export const catalogServiceFacade = new CatalogsServiceFacadeImpl(
  defaultProductService,
  DefaultColorService,
  DefaultMaterialService,
  defaultCollectionService,
  defaultDeviceService,
  defaultprintPatternService
);
