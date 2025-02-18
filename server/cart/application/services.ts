import { UpdateCartItem } from "@/lib/schemas/updateCartItem";
import { ApplicableProduct, ApplicableProductCouponDto, ApplyCouponCartDto, Cart, CartItem, CartItemQuery, CartTotal, CustomCaseCartDetails } from "../domain/models";
import { CartItemDto } from "./dto";

export interface ICartService {
  addItem(input: CartItem): Promise<CartItem[]>;
  getCartItems(cartId:string): Promise<CartItemQuery>;
  updateItem(input: UpdateCartItem): Promise<CartItem>;
  getTotalCart(cartId:string): Promise<CartTotal>;
  getApplicableCouponProduct(params:ApplicableProductCouponDto):Promise<ApplicableProduct>
  initCartAndAddItems(input: CartItemDto[],userId: string): Promise<{ cartId: string }> 
  findActiveCart(userId:string): Promise<{cartId:string}>
  findOrCreateActiveCart(userId:string): Promise<{cartId:string}>
  markCartAsCheckedOut(cartId:string): Promise<Cart>
}


