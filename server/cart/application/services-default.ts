import { TRPCError } from "@trpc/server";
import { UpdateCartItem } from "@/lib/schemas/updateCartItem";
import { ICartRepository } from "../domain/services";
import {
  ApplicableProduct,
  ApplicableProductCouponDto,
  Cart,
  CartItem,
  CartItemQuery,
  CartStatus,
} from "../domain/models";
import { ICartService } from "./services";
import { defaultCartRepository } from "../infrastructure/repositories-impl";
import { IStockService } from "@/server/stock/application/service-def";
import { defaultStockService } from "@/server/stock/application/service-impl";

class DefaultCartServiceImpl implements ICartService {
  constructor(
    private cartRepository: ICartRepository,
  ) {}

  async addItem(input: CartItem): Promise<CartItem[]> {
    const isProductInCart = await this.cartRepository.findProductInCart({
      deviceId: input.deviceId,
      cartId: input.cartId,
      productId: input.productId!,
    });
    if (isProductInCart) return [];

    const result = await this.cartRepository.createItem(input);
    return result as CartItem[];
  }

  saveCartItems(input: CartItem[]): Promise<CartItem[]> {
    return this.cartRepository.createItem(input) as any;
  }

  async updateItemQuantity(input: CartItem): Promise<CartItem[]> {
    const result = await this.cartRepository.createItem(input);
    return result as CartItem[];
  }

  async findActiveCart(userId: string): Promise<Cart> {
    return this.cartRepository.findActiveCart(userId);
  }

  findCart(cartId: string): Promise<{ cartId: string }> {
    return this.cartRepository.findCart(cartId);
  }

  async updateCart(cartId: string, input: Partial<Cart>): Promise<Cart> {
    return this.cartRepository.updateCart(cartId, input);
  }

  async markCartAsCheckedOut(cartId: string): Promise<Cart> {
    return this.cartRepository.updateCart(cartId, { status: "CHECKED_OUT" });
  }

  async findOrCreateCart(userId?: string): Promise<Cart> {
    const status:CartStatus = userId ? 'ACTIVE':"PENDING"
    if(userId){
      const activeUserCart = await this.cartRepository.findActiveCart(userId);
      if (activeUserCart) return activeUserCart;
    }
    return await this.cartRepository.createCart(status, userId);
  }

  async createCart(userId?: string): Promise<Cart> {
    const status: CartStatus = userId ? "ACTIVE" : "PENDING";
    return await this.cartRepository.createCart(status, userId);
  }

  // async initCartAndAddItems(
  //   input: CartItemDto[],
  //   userId: string
  // ): Promise<{ cartId: string }> {
  //   const { cartId } = await this.cartRepository.findOrCreateActiveCart(userId);
  //   const cartItems = await Promise.all(
  //     input.map(async (item) => {
  //       const stockRecord =
  //         await this.stockService.findStockByProductAndDeviceId({
  //           productId: item.productId,
  //           deviceId: item.deviceId,
  //         });
  //       const availableQuantity = stockRecord?.inStock || 0;
  //       const quantityToAdd = Math.min(item.quantity, availableQuantity);

  //       return {
  //         ...item,
  //         cartId,
  //         quantity: quantityToAdd,
  //       };
  //     })
  //   );

  //   await this.cartRepository.createItem(cartItems);
  //   return { cartId };
  // }
  async getInCartItems(cartId: string): Promise<CartItemQuery> {
    return await this.cartRepository.getItems({ cartId });
  }

  async updateItem(input: UpdateCartItem): Promise<CartItem> {
    return await this.cartRepository.updateItem(input);
  }

  async getCartItems(cartId: string): Promise<CartItem[]> {
      return await this.cartRepository.getCartItems(cartId)
  }

  async getApplicableCouponProduct(
    params: ApplicableProductCouponDto
  ): Promise<ApplicableProduct> {
    const product = await this.cartRepository.getApplicableCouponProduct(
      params
    );
    if (!product) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Coupon no aplicable a estos productos",
      });
    }
    return product;
  }
}

export const defaultCartService = new DefaultCartServiceImpl(
  defaultCartRepository,
);
