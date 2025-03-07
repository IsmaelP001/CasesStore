import {
  ApplicableProduct,
  ApplicableProductCouponDto,
  ApplyCouponCartDto,
  Cart,
  CartItem,
  CartItemQuery,
  CartStatus,
  CartTotal,
  FindProductInCart,
} from "../domain/models";
import { UpdateCartItem } from "@/lib/schemas/updateCartItem";

export interface ICartRepository {
  createItem(input: CartItem | CartItem[]): Promise<Partial<CartItem[]>>;
  getItems(params: { cartId: string }): Promise<CartItemQuery>;
  updateItem(input: UpdateCartItem): Promise<CartItem>;
  getApplicableCouponProduct(
    params: ApplicableProductCouponDto
  ): Promise<ApplicableProduct>;
  createCart(status:CartStatus,userId?: string): Promise<Cart>;
  findActiveCart(userId: string): Promise<Cart>;
  updateCart(cartId: string, input: Partial<Cart>): Promise<Cart>;
  findProductInCart(data:FindProductInCart): Promise<boolean>
  findCart(cartId: string): Promise<{ cartId: string }>;
  getCartItems(cartId:string):Promise<CartItem[]>
}

