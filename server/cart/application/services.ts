import { UpdateCartItem } from "@/lib/schemas/updateCartItem";
import { ApplicableProduct, ApplicableProductCouponDto, ApplyCouponCartDto, Cart, CartItem, CartItemQuery, CartTotal, CustomCaseCartDetails } from "../domain/models";
import { CartItemDto } from "./dto";

export interface ICartService {
  addItem(input: CartItem): Promise<CartItem[]>;
  saveCartItems(input:CartItem[]):Promise<CartItem[]>
  getInCartItems(cartId:string): Promise<CartItemQuery>;
  updateItem(input: UpdateCartItem): Promise<CartItem>;
  getApplicableCouponProduct(params:ApplicableProductCouponDto):Promise<ApplicableProduct>
  findActiveCart(userId:string): Promise<Cart>
  createCart(userId?:string): Promise<Cart>
  markCartAsCheckedOut(cartId:string): Promise<Cart>
  updateItemQuantity(input: CartItem): Promise<CartItem[]>
  findCart(cartId: string): Promise<{ cartId: string }>
  updateCart(cartId: string,input:Partial<Cart>): Promise<Cart>
  findOrCreateCart(userId?: string): Promise<Cart>
  getCartItems(cartId:string):Promise<CartItem[]>
}

export interface ICartServiceFacade {
  getCartItems(userId?: string): Promise<CartItemQuery>;
  mergeCart(userId: string): Promise<void>;
  getOrCreateActiveUserCart(userId?: string): Promise<{ cartId: string }>;
  createItem(cartItems: CartItemDto): Promise<CartItem[]>;
  updateItemQuantity(cartItems: CartItemDto): Promise<CartItem[]>;
}

