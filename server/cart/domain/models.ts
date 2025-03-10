import { ProductTypeEnum } from "@/server/catalog/domain/product.model";
import { number, string } from "zod";

export interface CartTotal {
  grossTotal: number;
  itebis: number;
  shipping: number;
  total: number;
}

export const cartStatusEnum = ['PENDING','ACTIVE','CHECKED_OUT','VERIFIED_USER','ABANDONED'] as const

export type CartStatus = typeof cartStatusEnum[number]

export interface Cart {
  id: string;
  userId: string;
  status: CartStatus;
}

export interface FindProductInCart {
  productId: string;
  cartId: string;
  deviceId: string;
  configurationId?:string
}

// export interface CartItemQueryElement{
//   quantity: number;
//   name: string;
//   price: number;
//   productId:string
//   configurationId?:string;
//   configurationImage?:string
//   productType:ProductTypeEnum
//   coverImage: string;
//   device: {
//     id: string;
//     name: string;
//   };
//   colorId: string
// }

export interface CartItem {
  id?: number;
  cartId: string;
  productId?: string;
  deviceId: string;
  quantity: number;
  prevQuantity?: number;
  colorId?: string | null;
}

interface BaseConfiguration {
  configurationId?: string;
  configurationImage?: string;
}

export interface CartItemQueryElement extends BaseConfiguration {
  name: string;
  price: string;
  productId: string;
  quantity: number;
  colorId: string;
  productType: ProductTypeEnum;
  coverImage: string;
  inStock: number;
  device: {
    id: string;
    name: string;
  };
}

export interface CartItemQuery {
  cartId: string;
  items: CartItemQueryElement[];
}

export interface ApplicableProductCouponDto {
  cartId: string;
  isAllProducts: boolean;
  couponApplicableProducts: string[];
}

export interface ApplyCouponCartDto {
  cartId: string;
  productId: string;
  couponId: string;
  discountValue: number;
}

export interface CartItem {
  id?: number;
  cartId: string;
  productId?: string;
  deviceId: string;
  quantity: number;
  prevQuantity?: number;
  colorId?: string | null;
  configurationId?: string | null;
}

export interface ApplicableProduct {
  product: {
    id: string;
    price: number;
  };
}

export interface CustomCaseCartDetails {
  id?: number;
  cartId: string;
  material: string;
  quantity: number;
  deviceId: string;
  price: string;
  discountId?: string | null;
  configurationId: string;
  createdAt?: Date;
  updatedAt?: Date;
  image?: {
    imageUrl: string;
  };
  device?: {
    name: string;
  };
}
