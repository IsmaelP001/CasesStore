import {
  cart,
  cartDetails,
  configurationimage,
  devices,
  discountCode as discountCodeTable,
  product,
  productDevices,
} from "@/config/database/schemes";
import { and, eq, inArray, max, sql, sum } from "drizzle-orm";
import { UpdateCartItem } from "@/lib/schemas/updateCartItem";
import { BaseRepository } from "@/server/shared/repositories/BaseRepository";
import {
  ApplicableProduct,
  ApplicableProductCouponDto,
  Cart,
  CartItem,
  CartItemQuery,
  CartTotal,
} from "../domain/models";

import {
  ICartRepository,
} from "../domain/services";
import { db } from "@/config/database/db";
import { couponCartItems } from "@/config/database/schemes/couponCartItems";

class CartRepositoryImpl
  extends BaseRepository<typeof cartDetails, "cartDetails">
  implements ICartRepository
{
  constructor(private cartTableRepository: CartTableRepository) {
    super(cartDetails, "cartDetails");
  }

  async findOrCreateActiveCart(userId: string): Promise<{ cartId: string }> {
    return await this.db.transaction(
      async (tx: any) => {
        const activeCart = await this.cartTableRepository.getFirst({
          filter: { userId, hasCheckout: false },
          tx,
        });

        if (activeCart?.id) {
          return { cartId: activeCart.id };
        }

        const [newCart] = await this.cartTableRepository.create(
          { userId, hasCheckout: false },
          { tx }
        );

        return { cartId: newCart.id };
      },
      {
        isolationLevel: "serializable",
        accessMode: "read write",
      }
    );
  }

  async findActiveCart(userId: string): Promise<{ cartId: string }> {
    const cartItem = await this.cartTableRepository.getFirst({
      filter: { userId, hasCheckout: false },
    });
    return { cartId: cartItem?.id };
  }

  async findProductInCart(productId: string,cartId:string): Promise<boolean> {
    const [product] = await db.select({
      count:sum(cartDetails.quantity)
    }).from(cartDetails).where(and(eq(cartDetails.productId,productId),eq(cartDetails.cartId,cartId)))
    return parseInt(product.count!) >= 1 ? true: false
  }
  async createItem(input: CartItem): Promise<Partial<CartItem[]>> {
    const createItemQuery = this.create(input as any);
    const removeProductFromCartIfExist =
      input.quantity - input.prevQuantity! === 0
        ? db
            .delete(couponCartItems)
            .where(
              and(
                eq(couponCartItems.productId, input.productId!),
                eq(couponCartItems.cartId, input.cartId)
              )
            )
        : null;

    const queries = [createItemQuery];
    if (removeProductFromCartIfExist) {
      queries.push(removeProductFromCartIfExist as any);
    }

    const [cartItemCreated] = await Promise.all(queries);
    return cartItemCreated;
  }

  async getItems({ cartId }: { cartId: string }): Promise<CartItemQuery> {
    const data = await this.db
      .select({
        quantity: sql<number>`SUM(${cartDetails.quantity})`.mapWith(Number),
        productId: product.id,
        name: product.name,
        price: product.price,
        coverImage: product.coverImage,
        configurationImage: sql<string>`MAX(${configurationimage.imageUrl})::varchar`,
        configurationId: configurationimage.id,
        productType: product.productType,
        device: {
          id: devices.id,
          name: devices.name,
        },
        inStock:productDevices.inStock,
        colorId: cartDetails.colorId,
      })
      .from(cartDetails)
      .leftJoin(product, eq(cartDetails.productId, product.id))
      .leftJoin(devices, eq(cartDetails.deviceId, devices.id))
      .leftJoin(productDevices, eq(productDevices.productId, cartDetails.productId))
      .leftJoin(
        configurationimage,
        eq(cartDetails.configurationId, configurationimage.id)
      )
      .where(eq(cartDetails.cartId, cartId))
      .groupBy(
        product.id,
        devices.id,
        cartDetails.cartId,
        cartDetails.colorId,
        configurationimage.id,
        cartDetails.configurationId,
        productDevices.inStock
      )
      .having(
        sql`SUM(${cartDetails.quantity}) >= 1 AND 
             (NOT (${product.productType} = 'CUSTOM_CASE_MATERIAL' AND ${cartDetails.configurationId} IS NULL))`
      );

    return {
      cartId,
      items: data,
    };
  }

  async getTotalCart(cartId: string): Promise<CartTotal> {
    const totalsInCart = await this.db
      .select({
        total:
          sql<number>`SUM(COALESCE(${cartDetails.quantity} * ${product.price},0))`.mapWith(
            Number
          ),
      })
      .from(cartDetails)
      .leftJoin(product, eq(cartDetails.productId, product.id))
      .where(
        sql`${cartDetails.cartId} = ${cartId} AND 
             NOT (${product.productType} = 'CUSTOM_CASE_MATERIAL' AND ${cartDetails.configurationId} IS NULL)`
      );
    
    const grossTotal = totalsInCart.total;
    const itebis = grossTotal * 0.18;

    
    return {
      grossTotal,
      itebis,
      total: grossTotal + itebis,
      shipping: 0,
    };
  }

  async updateItem(input: UpdateCartItem): Promise<CartItem> {
    return this.db
      .update(cartDetails)
      .set({ quantity: input.quantity })
      .where(
        and(
          eq(cartDetails.cartId, input.cartId),
          eq(cartDetails.productId, input.productId)
        )
      )
      .returning();
  }

  async getApplicableCouponProduct({
    cartId,
    isAllProducts,
    couponApplicableProducts,
  }: ApplicableProductCouponDto): Promise<ApplicableProduct> {
    return this.db.query.cartDetails.findFirst({
      where: and(
        eq(cartDetails.cartId, cartId),
        !isAllProducts && couponApplicableProducts?.length
          ? inArray(cartDetails.productId, couponApplicableProducts)
          : undefined
      ),
      with: {
        product: {
          columns: {
            id: true,
            price: true,
          },
        },
      },
    });
  }

  async updateCart(cartId: string, input: Partial<Cart>): Promise<Cart> {
    const data = await this.cartTableRepository.update({
      filter: { id: cartId },
      input,
    });
    return data[0] as Cart;
  }
}

class CartTableRepository extends BaseRepository<typeof cart, "cart"> {
  constructor() {
    super(cart, "cart");
  }
}

export const defaultCartRepository = new CartRepositoryImpl(
  new CartTableRepository()
);
