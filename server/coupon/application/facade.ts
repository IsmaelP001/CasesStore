import { handleError } from "@/server/shared/utils/errors";
import {
  ApplyCouponCart,
  Coupon,
  CouponInCartItem,
  CouponItem,
  ToogleCoupon,
} from "../domain/models";
import { ICouponService } from "./services";
import { defaultDiscountService } from "./services-impl";
import { ApplyCouponToCartDto, RemoveDiscountCodeDto } from "./dto";

class DefaultDiscountFacade {
  constructor(private discountService: ICouponService) {}

  async getCouponOrThrow(code: string): Promise<Coupon> {
    try {
      return await this.discountService.getCouponOrThrow(code);

    } catch (error) {
      handleError(error)
    }
  }

  async getActiveCoupons(): Promise<CouponItem[]> {
    try {
      return await this.discountService.getActiveCoupons();
    } catch (error) {
      handleError(error)
    }
  }

  async getExpiredCoupons(): Promise<CouponItem[]> {
    try {
      return this.discountService.getExpiredCoupons();
    } catch (error) {
      handleError(error)
    }
  }

  async createCoupon(coupon: CouponItem): Promise<Coupon> {
    try {
      return this.discountService.createCoupon(coupon);
    } catch (error) {
      handleError(error);
    }
  }

  async activeToogleCoupons(params: ToogleCoupon): Promise<boolean> {
    return this.discountService.activeToogleCoupons(params);
  }

  async deleteCoupon(id: string): Promise<CouponItem[]> {
    return this.discountService.deleteCoupon(id);
  }

  async addCouponToCart(
    data: ApplyCouponToCartDto
  ): Promise<ApplyCouponCart[]> {
    try {
      const coupon = await this.discountService.getCouponOrThrow(data.code);
      return await this.discountService.addCouponToCart({
        coupon,
        cartId: data.cartId,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async removeCouponFromCart(
    data: RemoveDiscountCodeDto
  ): Promise<ApplyCouponCart[]> {
    try {
      return await this.discountService.removeCouponFromCart(data);
    } catch (error) {
      handleError(error);
    }
  }

  async getCouponsInCart(cartId: string): Promise<CouponInCartItem> {
    try {
      return await this.discountService.getCouponsInCart({cartId});
    } catch (error) {
      handleError(error);
    }
  }
}

export const discountServiceFacade = new DefaultDiscountFacade(
  defaultDiscountService
);
