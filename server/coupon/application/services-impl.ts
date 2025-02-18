import { TRPCError } from "@trpc/server";
import {
  AddCouponToCart,
  ApplyCouponCart,
  Coupon,
  CouponInCartItem,
  CouponItem,
  ToogleCoupon,
} from "../domain/models";
import { ICouponService } from "./services";
import {
  ICouponInCartRepository,
  IDiscountCodeRepository,
} from "../domain/repositories";
import {
  defaultCouponInCartRepository,
  defaultDiscountCodeRepository,
} from "../infrastructure/repositories-impl";
import { ICartService } from "@/server/cart/application/services";
import { defaultCartService } from "@/server/cart/application/services-default";
import { getCouponInCartDto, RemoveDiscountCodeDto } from "./dto";

class DefaultDiscountCodeService implements ICouponService {
  constructor(
    private discountCodeRepository: IDiscountCodeRepository,
    private couponInCartRepository: ICouponInCartRepository,
    private cartService: ICartService
  ) {}

  async getCouponOrThrow(code: string): Promise<Coupon> {
    const coupon = await this.discountCodeRepository.getCoupon(code);
    coupon.getItemOrThrow();
    coupon.validateCouponExpiry();
    coupon.validateCouponLimits();
    return coupon;
  }

  async getActiveCoupons(): Promise<CouponItem[]> {
    return this.discountCodeRepository.getActiveCoupons();
  }

  async getExpiredCoupons(): Promise<CouponItem[]> {
    return this.discountCodeRepository.getExpiredCoupons();
  }

  async createCoupon(coupon: CouponItem): Promise<Coupon> {
    const isCouponExist = await this.discountCodeRepository.getCoupon(
      coupon.code
    );
    if (isCouponExist?.getItem) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Un coupon con este nombre ya existe.",
      });
    }
    return this.discountCodeRepository.createCoupon(coupon);
  }

  async activeToogleCoupons(params: ToogleCoupon): Promise<boolean> {
    return this.discountCodeRepository.activeToogleCoupons(params);
  }

  async deleteCoupon(id: string): Promise<CouponItem[]> {
    return this.discountCodeRepository.deleteCoupon(id);
  }

  async addCouponToCart({
    cartId,
    coupon,
  }: AddCouponToCart): Promise<ApplyCouponCart[]> {
    const { product } = await this.cartService.getApplicableCouponProduct({
      cartId,
      isAllProducts: coupon?.getItem?.allProducts!,
      couponApplicableProducts: coupon?.getItem?.productIds!,
    });

    const { discountAmount, discountType } = coupon.getItem;
    const discountValue =
      discountType === "FIXED"
        ? discountAmount
        : product.price * (discountAmount / 100);

    const data = {
      cartId,
      discountId: coupon.getItem.id!,
      discountValue,
      productId: product.id,
      discountCode:coupon.getItem.code
    };

    return this.couponInCartRepository.updateCartWithCoupon(data);
  }

  removeCouponFromCart(data:RemoveDiscountCodeDto): Promise<ApplyCouponCart[]> {
    return this.couponInCartRepository.removeCoupon(data)
  }

  getCouponsInCart(data:getCouponInCartDto): Promise<CouponInCartItem> {
    return this.couponInCartRepository.getCouponsInCart(data)
  }

  getCouponById(discountId: string): Promise<Coupon> {
    return this.discountCodeRepository.getCouponById(discountId)
  }

}

export const defaultDiscountService = new DefaultDiscountCodeService(
  defaultDiscountCodeRepository,
  defaultCouponInCartRepository,
  defaultCartService
);
