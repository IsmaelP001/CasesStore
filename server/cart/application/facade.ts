import { ICartServiceFacade, ICartService } from "./services";
import { Cart, CartItem, CartItemQuery } from "../domain/models";
import { handleError } from "@/server/shared/utils/errors";
import { defaultCartService } from "./services-default";
import { CartItemDto } from "./dto";
import { API_CONFIG, VARIABLES_CONFIG } from "@/lib/utils/utils";
import { extractPayload, generateToken, PayloadCart } from "@/lib/utils/token";
import { cookies } from "next/headers";

class DefaultCartFacade implements ICartServiceFacade {
  constructor(private cartService: ICartService) {}

  async getCartItems(userId?: string): Promise<CartItemQuery> {
    try {
      const { cartId } = await this.getOrCreateActiveUserCart(userId);
      return await this.cartService.getInCartItems(cartId);
    } catch (error) {
      handleError(error);
    }
  }

  private get getCartCookie() {
    const cookieStore = cookies();
    const cartToken = cookieStore.get(VARIABLES_CONFIG.CART_TOKEN!)?.value;
    const payload = cartToken ? extractPayload(cartToken) : null;
    return payload;
  }
  async mergeCart(userId: string): Promise<void> {
   try {
    const cartToken = this.getCartCookie as any;
    if (cartToken?.cart?.state !== "PENDING") return;
    let activeCart = await this.cartService.findActiveCart(userId);
    if (!activeCart) {
      activeCart = await this.cartService.updateCart(cartToken?.cart?.id, {
        status: "ACTIVE",
        userId,
      });
      return;
    }
    const cartItems = await this.cartService.getCartItems(cartToken?.cart.id!);
    const carItemsMap = cartItems.map(({ id, cartId, ...rest }) => ({
      cartId: activeCart.id,
      ...rest,
    }));
    await Promise.all([
      this.cartService.saveCartItems(carItemsMap),
      this.cartService.updateCart(cartToken?.cart.id, {
        userId,
        status:'VERIFIED_USER',
      }),
    ]);
    this.saveCartToken(activeCart);
   } catch (error) {
    console.log('Error syncing cart',error)
   }
  }

  async getOrCreateActiveUserCart(
    userId?: string
  ): Promise<{ cartId: string }> {
    const cartToken = this.getCartCookie as any;

    if (cartToken?.cart?.id) {
      return { cartId: cartToken?.cart?.id };
    }
    try {
      const newCart = await this.cartService.findOrCreateCart(userId);
      this.saveCartToken(newCart);
      return { cartId: newCart.id };
    } catch (error) {
      handleError(error);
    }
  }

  private saveCartToken(cart: Cart) {
    const payload: PayloadCart = {
      cart: {
        id: cart.id,
        state: cart.status,
      },
      iat: Math.floor(Date.now() / 1000),
    };
    const token = generateToken(payload, API_CONFIG.MAX_AGE_CART_TOKEN);
    cookies().set(VARIABLES_CONFIG.CART_TOKEN!, token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });
  }

  async createItem(cartItems: CartItemDto): Promise<CartItem[]> {
    try {
      const { cartId } = await this.getOrCreateActiveUserCart(
        cartItems.userId!
      );
      return await this.cartService.addItem({ ...cartItems, cartId });
    } catch (error) {
      handleError(error);
    }
  }

  async updateItemQuantity(cartItems: CartItemDto): Promise<CartItem[]> {
    try {
      const { cartId } = await this.getOrCreateActiveUserCart(
        cartItems.userId!
      );
      return await this.cartService.updateItemQuantity({
        ...cartItems,
        cartId,
      });
    } catch (error) {
      handleError(error);
    }
  }
}

export const defaultCartFacade = new DefaultCartFacade(defaultCartService);
