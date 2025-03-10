export const productTypeEnumValues = [
  "CASE",
  "ACCESORY",
  "CUSTOM_CASE_MATERIAL",
] as const;
export type ProductTypeEnum = (typeof productTypeEnumValues)[number];

export interface ProductFilters {
  device?: string[];
  collection?: string[];
  pattern?: string[];
  color?: string[];
  material?: string[];
  q?: string;
  page?: number;
  pageSize?: number;
}

export interface Images {
  id: number;
  image: string;
}

// export interface Product {
//     id: string;
//     name: string
//     price: number;
//     coverImage:string;
//     isFavorite?:boolean
//     collection: {
//         id: string;
//         name: string;
//     }
// }

export interface ProductSearchCriteria {
  id: string;
  name: string;
  collection: string;
}

export interface MostOrderedProductQuery {
  includeCollections?: boolean;
}

export interface Product {
  id?: string;
  name: string;
  price: number;
  productType: ProductTypeEnum;
  coverImage?: string;
  discountPrice?: number | null;
  isFavorite?: boolean;
  collection?: {
    id: string;
    name: string;
  };
  isConfigurable?: boolean;
  collectionId?: string;
  printPatternId?: string;
  materialId?: string;
  colorId?: string;
  count?: number;
}

export interface ProductsResponse {
  items: Product[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface NewProduct {
  id?: string;
  name: string;
  price: number;
  discountPrice?: number;
  isConfigurable: boolean;
  collectionId: string;
  printPatternId: string;
  materialId: string;
  coverImage?: string;
  colorId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateProduct {
  product: Product;
  images: string[];
  selectedProducts: number[];
}

export interface ProductById {
  id: string;
  name: string;
  price: number;
  discountPrice: number;
  coverImage: string;
  images: Images[];
  description?:string;
  collection: {
    id: string;
    name: string;
  };
  color: {
    id: string;
    name: string;
  };
  material: {
    id: string;
    name: string;
  };
  devices: {
    id: string;
    name: string;
    inStock: number;
  }[];
  printPattern: {
    id: string;
    name: string;
  };
}
