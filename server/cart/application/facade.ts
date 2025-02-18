import { ICartService } from "./services";
import { Cart, CartItem } from "../domain/models";
import { handleError } from "@/server/shared/utils/errors";
import { defaultCartService } from "./services-default";
import { CartItemDto } from "./dto";
import { getCookie, setCookie } from "@/lib/utils/cookies";

class DefaultCartFacade {
  constructor(private cartService: ICartService) {}

  async getCartItems(userId: string) {
    try {
      const { cartId } = await this.getOrCreateActiveUserCart(userId);
      return await this.cartService.getCartItems(cartId);
    } catch (error) {
      handleError(error);
    }
  }



  async getTotalsInCart(cartId: string) {
    try {
      return await this.cartService.getTotalCart(cartId);
    } catch (error) {
      handleError(error);
    }
  }

  async initCartAndAddItems(
    cartItems: CartItemDto[],
    userId: string
  ): Promise<{ cartId: string }> {
    try {
      return await this.cartService.initCartAndAddItems(cartItems, userId);
    } catch (error) {
      handleError(error);
    }
  }

  async getOrCreateActiveUserCart(userId: string): Promise<{ cartId: string }> {
    const cartId = await getCookie({ cookieName: "CART_ID" });
    try {
      if (cartId) {
        return { cartId: cartId.value };
      }
      const newCartId = await this.cartService.findOrCreateActiveCart(userId);
      setCookie({ cookieName: "CART_ID", value: newCartId.cartId });
      return newCartId;
    } catch (error) {
      handleError(error);
    }
  }

  async createItem(cartItems: CartItemDto) {
    try {
      const { cartId } = await this.getOrCreateActiveUserCart(
        cartItems.userId!
      );
      return await this.cartService.addItem({ ...cartItems, cartId });
    } catch (error) {
      console.log("err cart item", error);
      handleError(error);
    }
  }

  async findOrCreateActiveCart(userId: string) {
    try {
      return await this.cartService.findOrCreateActiveCart(userId);
    } catch (error) {
      handleError(error);
    }
  }

  async markCartAsCheckedOut(cartId: string): Promise<Cart> {
    return this.cartService.markCartAsCheckedOut(cartId);
  }

}

export const defaultCartFacade = new DefaultCartFacade(defaultCartService);
