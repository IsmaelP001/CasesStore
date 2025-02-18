import {
  color,
  couponCartItems,
  discountCode,
  orderDetails,
} from "@/config/database/schemes";
import { BaseRepository } from "@/server/shared/repositories/BaseRepository";
import {
  ApplyCouponCart,
  Coupon,
  CouponInCartItem,
  CouponItem,
  ToogleCoupon,
} from "../domain/models";
import {
  ICouponInCartRepository,
  IDiscountCodeRepository,
} from "../domain/repositories";
import {
  and,
  count,
  eq,
  gt,
  gte,
  isNull,
  lt,
  lte,
  not,
  or,
  sql,
} from "drizzle-orm";
import { db } from "@/config/database/db";
import { getCouponInCartDto, RemoveDiscountCodeDto } from "../application/dto";

class DefaultDiscountCodeRepositoryImpl
  extends BaseRepository<typeof discountCode, "discountCode">
  implements IDiscountCodeRepository
{
  constructor() {
    super(discountCode, "discountCode");
  }

  async createCoupon(coupon: CouponItem): Promise<Coupon> {
    const newCoupon = await this.create(coupon as any);
    return new Coupon(newCoupon[0] as CouponItem);
  }

  async getActiveCoupons(): Promise<CouponItem[]> {
    const currentDate = new Date();
    currentDate.setMinutes(
      currentDate.getMinutes() - currentDate.getTimezoneOffset()
    );

    const coupons = await this.db
      .select({
        id: discountCode.id,
        code: discountCode.code,
        expiresAt: discountCode.expiresAt,
        discountAmount: discountCode.discountAmount,
        uses: discountCode.uses,
        limit: discountCode.limit,
        isActive: discountCode.isActive,
        discountType: discountCode.discountType,
      })
      .from(discountCode);
    // .groupBy(discountCode.id)
    // .where(and(gt(discountCode.expiresAt, currentDate)))
    // .having(({ uses }: any) =>
    //   or(lt(uses, discountCode.limit), isNull(discountCode.limit))
    // );

    return coupons as CouponItem[];
  }

  async getCouponById(discountId: string): Promise<Coupon> {
    const data = await this.getFirst({ filter: { id: discountId } });
    return new Coupon(data as CouponItem);
  }

  async getExpiredCoupons(): Promise<CouponItem[]> {
    const currentDate = new Date();
    currentDate.setMinutes(
      currentDate.getMinutes() - currentDate.getTimezoneOffset()
    );
    const coupons = await this.db
      .select({
        id: discountCode.id,
        code: discountCode.code,
        expiresAt: discountCode.expiresAt,
        discountAmount: discountCode.discountAmount,
        uses: discountCode.uses,
        limit: discountCode.limit,
        isActive: discountCode.isActive,
        discountType: discountCode.discountType,
      })
      .from(discountCode);
    // .leftJoin(orderDetails, eq(orderDetails.discountId, discountCode.id))
    // .groupBy(discountCode.id)
    // .having(({ uses }: any) =>
    //   or(
    //     and(not(isNull(discountCode.limit)), gte(uses, discountCode.limit)),
    //     lte(discountCode.expiresAt, currentDate)
    //   )
    // );
    return coupons as CouponItem[];
  }

  async getCoupon(code: string): Promise<Coupon> {
    const couponItem = await this.getFirst({
      filter: { code },
    });

    return new Coupon(couponItem as CouponItem);
  }

  async activeToogleCoupons({ id, isActive }: ToogleCoupon): Promise<boolean> {
    const updatedCoupon = await this.db
      .update(discountCode)
      .set({ isActive })
      .where(eq(discountCode.id, id))
      .returning({ id: discountCode.id });
    return updatedCoupon?.length ? true : false;
  }

  async deleteCoupon(id: string): Promise<CouponItem[]> {
    return (await this.delete({ filter: { id } })) as CouponItem[];
  }
}

class CouponInCartRepositoryImpl
  extends BaseRepository<typeof couponCartItems, "couponCartItems">
  implements ICouponInCartRepository
{
  constructor() {
    super(couponCartItems, "couponCartItems");
  }

  async getCouponsInCart({cartId,includeCouponItem}:getCouponInCartDto): Promise<CouponInCartItem> {
 
    const data = await this.getFirst({
      filter: { cartId },
      columns: {
        id: true,
        productId: true,
        cartId: true,
        discountId: true,
        discountValue: true,
        discountCode: true,
      },
      with:{
        coupon:includeCouponItem ? true : undefined
      }
    })

    const coupon= data?.coupon ? new Coupon(data?.coupon! as CouponItem):undefined

    return{
      ...data,
      coupon
    }


  }

  async updateCartWithCoupon(
    data: ApplyCouponCart
  ): Promise<ApplyCouponCart[]> {
    return this.db.insert(couponCartItems).values(data).onConflictDoNothing();
  }

  async removeCoupon({
    discountId,
    cartId,
  }: RemoveDiscountCodeDto): Promise<ApplyCouponCart[]> {
    return this.db
      .delete(couponCartItems)
      .where(
        and(
          eq(couponCartItems.discountId, discountId),
          eq(couponCartItems.cartId, cartId)
        )
      );
  }
}

export const defaultCouponInCartRepository = new CouponInCartRepositoryImpl();

export const defaultDiscountCodeRepository =
  new DefaultDiscountCodeRepositoryImpl();
