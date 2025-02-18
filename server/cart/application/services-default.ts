import { TRPCError } from "@trpc/server";
import { UpdateCartItem } from "@/lib/schemas/updateCartItem";
import { ICartRepository } from "../domain/services";
import {
  ApplicableProduct,
  ApplicableProductCouponDto,
  Cart,
  CartItem,
  CartItemQuery,
  CartTotal,
} from "../domain/models";
import { ICartService } from "./services";
import { defaultCartRepository } from "../infrastructure/repositories-impl";
import { CartItemDto } from "./dto";
import { handleError } from "@/server/shared/utils/errors";
import { IStockService } from "@/server/stock/application/service-def";
import { defaultStockService } from "@/server/stock/application/service-impl";

class DefaultCartServiceImpl implements ICartService {
  constructor(
    private cartRepository: ICartRepository,
    private stockService: IStockService
  ) {}

  async addItem(input: CartItem): Promise<CartItem[]> {
    if (input?.isAddItemFirstTime) {
      const isProductInCart = await this.cartRepository.findProductInCart(
        input.productId!,
        input.cartId
      );
      if (isProductInCart) return [];
    }
    const result = await this.cartRepository.createItem(input);
    return result as CartItem[];
  }

  async findActiveCart(userId: string): Promise<{ cartId: string }> {
    return this.cartRepository.findActiveCart(userId);
  }

  async markCartAsCheckedOut(cartId: string): Promise<Cart> {
    return this.cartRepository.updateCart(cartId, { hasCheckout: true });
  }

  async findOrCreateActiveCart(userId: string): Promise<{ cartId: string }> {
    return await this.cartRepository.findOrCreateActiveCart(userId);
  }

  async initCartAndAddItems(
    input: CartItemDto[],
    userId: string
  ): Promise<{ cartId: string }> {
    const { cartId } = await this.cartRepository.findOrCreateActiveCart(userId);
    const cartItems = await Promise.all(
      input.map(async (item) => {
        const stockRecord = await this.stockService.findStockByProductAndDeviceId({
          productId:item.productId,
          deviceId:item.deviceId
        });
        const availableQuantity = stockRecord?.inStock || 0;
        const quantityToAdd = Math.min(item.quantity, availableQuantity);

        return {
          ...item,
          cartId,
          quantity: quantityToAdd,
        };
      })
    );

    await this.cartRepository.createItem(cartItems);
    return { cartId };
  }

  async getCartItems(cartId: string): Promise<CartItemQuery> {
    try {
      return await this.cartRepository.getItems({ cartId });
    } catch (error) {
      handleError(error);
    }
  }

  async updateItem(input: UpdateCartItem): Promise<CartItem> {
    return await this.cartRepository.updateItem(input);
  }

  async getTotalCart(cartId: string): Promise<CartTotal> {
    return await this.cartRepository.getTotalCart(cartId);
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
  defaultStockService
);
