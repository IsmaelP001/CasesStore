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
  CartStatus,
  CartTotal,
  FindProductInCart,
} from "../domain/models";

import { ICartRepository } from "../domain/services";
import { db } from "@/config/database/db";
import { couponCartItems } from "@/config/database/schemes/couponCartItems";
import { jsonAggBuildObject } from "@/lib/utils/querys";

class CartRepositoryImpl
  extends BaseRepository<typeof cartDetails, "cartDetails">
  implements ICartRepository
{
  constructor(private cartTableRepository: CartTableRepository) {
    super(cartDetails, "cartDetails");
  }


  async createCart(status:CartStatus,userId?: string): Promise<Cart> {
    return await this.db.transaction(
      async (tx: any) => {

        const [newCart] = await this.cartTableRepository.create(
          { userId, status },
          { tx }
        );

        return newCart 
      },
      {
        isolationLevel: "serializable",
        accessMode: "read write",
      }
    );
  }

  async findActiveCart(userId: string): Promise<Cart> {
    return await this.cartTableRepository.getFirst({
      filter: { userId, status: 'ACTIVE' },
    }) as Cart
  }


  async findCart(cartId: string): Promise<{ cartId: string }> {
    const cartItem = await this.cartTableRepository.getFirst({
      filter: { id:cartId},
    });
    return { cartId: cartItem?.id };
  }


  async findProductInCart({
    deviceId,
    productId,
    cartId,
  }: FindProductInCart): Promise<boolean> {
    const [product] = await db
      .select({
        count: sum(cartDetails.quantity),
      })
      .from(cartDetails)
      .where(
        and(
          eq(cartDetails.productId, productId),
          eq(cartDetails.cartId, cartId),
          eq(cartDetails.deviceId, deviceId)
        )
      );
    return parseInt(product.count!) >= 1 ? true : false;
  }
  async createItem(input: CartItem[]): Promise<Partial<CartItem[]>> {
    const createItemQuery = this.create(input as any);
    // const removeProductFromCartIfExist =
    //   input.quantity - input.prevQuantity! === 0
    //     ? db
    //         .delete(couponCartItems)
    //         .where(
    //           and(
    //             eq(couponCartItems.productId, input.productId!),
    //             eq(couponCartItems.cartId, input.cartId)
    //           )
    //         )
    //     : null;

    // const queries = [createItemQuery];
    // if (removeProductFromCartIfExist) {
    //   queries.push(removeProductFromCartIfExist as any);
    // }

    return await createItemQuery;
  }

  async getCartItems(cartId:string):Promise<CartItem[]>{
    return this.getAll({where:eq(cartDetails.cartId,cartId)});
  }

  async getItems({ cartId }: { cartId: string }): Promise<CartItemQuery> {
    const data = await this.db
      .select({
        quantity: sql<number>`SUM(${cartDetails.quantity})`.mapWith(Number),
        productId: product.id,
        deviceId: devices.id,
        name: product.name,
        price: product.price,
        coverImage: product.coverImage,
        configurationImage: sql<string>`MAX(${configurationimage.imageUrl})::varchar`,
        configurationId: cartDetails.configurationId,
        productType: product.productType,
        device: {
          id: devices.id,
          name: devices.name,
        },
        inStock: productDevices.inStock,
        colorId: cartDetails.colorId,
      })
      .from(cartDetails)
      .innerJoin(product, eq(cartDetails.productId, product.id))
      .innerJoin(devices, eq(cartDetails.deviceId, devices.id))
      .innerJoin(
        productDevices,
        and(
          eq(productDevices.productId, cartDetails.productId),
          eq(productDevices.deviceId, cartDetails.deviceId)
        )
      )
      .leftJoin(
        configurationimage,
        eq(cartDetails.configurationId, configurationimage.id)
      )
      .where(eq(cartDetails.cartId, cartId))
      .groupBy(
        product.id,
        product.name,
        product.price,
        product.coverImage,
        product.productType,
        devices.id,
        devices.name,
        configurationimage.id,
        cartDetails.configurationId,
        cartDetails.colorId,
        productDevices.inStock
      )
      .having(sql`SUM(${cartDetails.quantity}) > 0`)
      .orderBy(product.name, devices.name);

    return {
      cartId,
      items: data,
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
