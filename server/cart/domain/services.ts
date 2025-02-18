import {
  ApplicableProduct,
  ApplicableProductCouponDto,
  ApplyCouponCartDto,
  Cart,
  CartItem,
  CartItemQuery,
  CartTotal,
} from "../domain/models";
import { UpdateCartItem } from "@/lib/schemas/updateCartItem";

export interface ICartRepository {
  createItem(input: CartItem | CartItem[]): Promise<Partial<CartItem[]>>;
  getItems(params: { cartId: string }): Promise<CartItemQuery>;
  getTotalCart(cartId:string): Promise<CartTotal>
  updateItem(input: UpdateCartItem): Promise<CartItem>;
  getApplicableCouponProduct(
    params: ApplicableProductCouponDto
  ): Promise<ApplicableProduct>;
  findOrCreateActiveCart(userId: string): Promise<{ cartId: string }>;
  findActiveCart(userId: string): Promise<{ cartId: string }>;
  updateCart(cartId: string, input: Partial<Cart>): Promise<Cart>;
  findProductInCart(productId: string,cartId:string): Promise<boolean>
}

