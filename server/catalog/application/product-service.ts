import {
  CreateProduct,
  Product,
  ProductById,
  ProductFilters,
  ProductSearchCriteria,
  ProductsResponse,
  ProductTypeEnum,
} from "../domain/product.model";
import { IProductRepository } from "../domain/repositories";
import { defaultProductRepository } from "../infrastructure/product-repositories";
import { IProductService } from "./service.definitions";
import { v4 as uuidv4 } from "uuid";

class ProductService implements IProductService {
  constructor(private productRepository: IProductRepository) {}

  async getAll(filter: ProductFilters): Promise<ProductsResponse> {
    return await this.productRepository.getProducts(filter);
  }

  async getById(productId: string): Promise<ProductById | null> {
    return await this.productRepository.getProductById(productId);
  }

  async getMostOrderedProducts(): Promise<Product[]> {
    return await this.productRepository.getMostOrderedProducts({});
  }

  async getTopSalesProducts(): Promise<Product[]> {
    return await this.productRepository.getMostOrderedProducts({includeCollections:false});
  }

  async getNewProducts(): Promise<Product[]> {
    return await this.productRepository.getNewProducts();
  }

  async getProductsBySearchCriteria(
    query: string
  ): Promise<Product[]> {
    return this.productRepository.getProductsBy(query);
  }

  createProduct(data: CreateProduct): Promise<Product> {
    const productId = uuidv4();
    const productDevices: any = data.selectedProducts.map((deviceId) => ({
      deviceId,
      productId,
    }));

    const product = {
      ...data.product,
      id: productId,
    };


    return this.productRepository.createProduct({
      ...data,
      product,
      selectedProducts: productDevices,
    });
  }

  updateProduct(product: CreateProduct): Promise<CreateProduct[]> {
    return this.updateProduct(product);
  }

  getProductsByType(productType: ProductTypeEnum): Promise<Product[]> {
    return this.productRepository.getProductsByType(productType)
  }
}

export const defaultProductService = new ProductService(
  defaultProductRepository
);
