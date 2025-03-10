import {
  collection as collectionTable,
  color as colorTable,
  devices as devicesTable,
  favorite as favoriteTable,
  material as materialTable,
  printPattern as printPatternTable,
  product as productTable,
  productDevices as productDevicesTable,
  productImages as productImagesTable,
  orderDetails,
  devices,
  productDevices,
  product,
} from "@/config/database/schemes";
import {
  and,
  count,
  desc,
  eq,
  ilike,
  inArray,
  like,
  ne,
  or,
  sql,
} from "drizzle-orm";
import { BaseRepository } from "@/server/shared/repositories/BaseRepository";
import {
  CreateProduct,
  MostOrderedProductQuery,
  Product,
  ProductById,
  ProductFilters,
  ProductSearchCriteria,
  ProductsResponse,
  ProductTypeEnum,
} from "../domain/product.model";
import { db } from "@/config/database/db";
import { IProductRepository } from "../domain/repositories";

class DefaultProductRepositoryImpl
  extends BaseRepository<typeof productTable, "product">
  implements IProductRepository
{
  constructor() {
    super(productTable, "product");
  }

  async getProducts(filter: ProductFilters): Promise<ProductsResponse> {
    const {
      device,
      collection,
      pattern,
      color,
      material,
      q,
      page = 1,
      pageSize = 10,
    } = filter;

    // Consulta base para obtener productos filtrados
    let baseQuery = this.db
      .select({
        id: productTable.id,
        name: productTable.name,
        price: productTable.price,
        coverImage: productTable.coverImage,
        collection: {
          id: collectionTable.id,
          name: collectionTable.name,
        },
      })
      .from(productTable)
      .leftJoin(
        collectionTable,
        eq(collectionTable.id, productTable.collectionId)
      );

    const filterConditions: any[] = [];
    const groupByColumns: any[] = [productTable.id, collectionTable.id];

    filterConditions.push(ne(productTable.productType, "CUSTOM_CASE_MATERIAL"));

    if (device?.length) {
      baseQuery = baseQuery
        .leftJoin(
          productDevicesTable,
          eq(productDevicesTable.productId, productTable.id)
        )
        .leftJoin(
          devicesTable,
          eq(productDevicesTable.deviceId, devicesTable.id)
        );
      filterConditions.push(inArray(devicesTable.name, device));
      groupByColumns.push(devicesTable.name);
    }

    if (collection?.length) {
      filterConditions.push(inArray(collectionTable.name, collection));
    }

    if (pattern?.length) {
      baseQuery = baseQuery.leftJoin(
        printPatternTable,
        eq(printPatternTable.id, productTable.printPatternId)
      );
      filterConditions.push(inArray(printPatternTable.name, pattern));
      groupByColumns.push(printPatternTable.name);
    }

    if (color?.length) {
      baseQuery = baseQuery.leftJoin(
        colorTable,
        eq(colorTable.id, productTable.colorId)
      );
      filterConditions.push(inArray(colorTable.name, color));
      groupByColumns.push(colorTable.name);
    }

    if (material?.length) {
      baseQuery = baseQuery.leftJoin(
        materialTable,
        eq(materialTable.id, productTable.materialId)
      );
      filterConditions.push(inArray(materialTable.name, material));
      groupByColumns.push(materialTable.name);
    }

    if (q) {
      filterConditions.push(like(productTable.name, `%${q}%`));
    }

    if (filterConditions.length) {
      baseQuery = baseQuery.where(and(...filterConditions));
    }

    baseQuery = baseQuery.groupBy(...groupByColumns);

    // Consulta para contar el total de items
    const countQuery = this.db
      .select({ count: count() })
      .from(baseQuery.as("filteredProducts"));

    // Consulta para obtener los productos con paginación
    const paginatedQuery = baseQuery
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    // Ejecutar ambas consultas
    const [totalResults, paginatedProducts] = await Promise.all([
      countQuery,
      paginatedQuery,
    ]);

    const totalItems = Number(totalResults[0]?.count || 0);
    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      items: paginatedProducts as Product[],
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }

  async getProductById(productId: string): Promise<ProductById | null> {
    const result = await this.getFirst({
      filter: { id: productId },
      columns: {
        id: true,
        name: true,
        discountPrice: true,
        price: true,
        isConfigurable: true,
        coverImage: true,
        description:true
      },
      with: {
        images: {
          columns: {
            id: true,
            image: true,
          },
        },
        collection: {
          columns: {
            id: true,
            name: true,
          },
        },
        color: {
          columns: {
            id: true,
            name: true,
          },
        },
        printPattern: {
          columns: {
            id: true,
            name: true,
          },
        },
        material: {
          columns: {
            id: true,
            name: true,
          },
        },
        productDevices: {
          columns: {
            id: true,
            inStock: true,
          },
          with: {
            devices: {
              columns: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (result) {
      const { productDevices, ...rest } = result;
      const devices = result.productDevices.map((item) => ({
        ...item.devices,
        inStock: item.inStock,
      }));

      const product = { ...rest, devices };
      return product as ProductById;
    }

    return null;
  }

  async createProduct(data: CreateProduct): Promise<Product> {
    const { selectedProducts, product, images } = data;

    const productImagesValues = images.map((image) => ({
      image,
      productId: product.id,
    }));

    const newProduct = await db.transaction(async (tx: any) => {
      const [newProduct] = await Promise.all([
        this.create({ ...product, coverImage: images[0] }, { tx }),
        tx.insert(productDevices).values(selectedProducts as any),
        tx.insert(productImagesTable).values(productImagesValues as any),
      ]);
      return newProduct;
    });

    return newProduct[0] as Product;
  }

  // async updateProduct(product: CreateProduct): Promise<CreateProduct[]> {
  //   const data = await this.update({
  //     filter: { id: product.id! },
  //     input: product,
  //   });
  //   return data as CreateProduct[];
  // }

  async getProductsByType(productType: ProductTypeEnum): Promise<Product[]> {
    return (await this.getAll({
      columns: {
        id: true,
        name: true,
        price: true,
        coverImage: true,
        discountPrice: true,
        isConfigurable: true,
        materialId: true,
        collectionId: true,
        colorId: true,
      },
      where: eq(product.productType, productType),
    })) as any[];
  }

  async getProductsBy(query: string): Promise<Product[]> {
    let result = this.db
      .select({
        id: productTable.id,
        name: productTable.name,
        price: productTable.price,
        coverImage: productTable.coverImage,
        collection: {
          id: collectionTable.id,
          name: collectionTable.name,
        },
      })
      .from(productTable)
      .leftJoin(
        productDevicesTable,
        eq(productDevicesTable.productId, productTable.id)
      )
      .leftJoin(devicesTable, eq(productDevicesTable.deviceId, devicesTable.id))
      .leftJoin(
        collectionTable,
        eq(productTable.collectionId, collectionTable.id)
      )
      .where(
        or(
          ilike(productTable.name, `%${query}%`),
          ilike(devices.name, `%${query}%`),
          ilike(collectionTable.name, `%${query}%`)
        )
      )
      .groupBy(product.id, collectionTable.id);

    return result as Product[];
  }

  async getNewProducts(): Promise<Product[]> {
    const result = await this.getAll({
      columns: {
        id: true,
        name: true,
        price: true,
        coverImage: true,
        productType: true,
      },
      with: {
        collection: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: desc(productTable.createdAt),
      limit: 8,
      where: ne(productTable.productType, "CUSTOM_CASE_MATERIAL"),
    });

    return result as Product[];
  }

  async getMostOrderedProducts({
    includeCollections = true,
  }: MostOrderedProductQuery): Promise<Product[]> {
    let query = db
      .select({
        id: productTable.id,
        name: productTable.name,
        price: productTable.price,
        coverImage: productTable.coverImage,
        productType: productTable.productType,
        ...(includeCollections && {
          collection: {
            id: collectionTable.id,
            name: collectionTable.name,
          },
        }),
        count: count(orderDetails.id),
      })
      .from(productTable)

      .groupBy(productTable.id, collectionTable.id)
      .leftJoin(orderDetails, eq(orderDetails.productId, productTable.id))
      .orderBy(desc(count(orderDetails.id)))
      .limit(8)
      .where(ne(product.productType, "CUSTOM_CASE_MATERIAL"))
      .$dynamic();

    if (includeCollections) {
      query.leftJoin(
        collectionTable,
        eq(collectionTable.id, productTable.collectionId)
      );
    }

    const data = (await query) as Product[];

    return data;
  }
}

export const defaultProductRepository = new DefaultProductRepositoryImpl();
