import { getCouponInCartDto, RemoveDiscountCodeDto } from "../application/dto";
import { ApplyCouponCart, Coupon, CouponInCartItem, CouponItem, ToogleCoupon } from "./models";

export interface CouponId {
  value: string;
}

export interface IDiscountCodeRepository {
  getCoupon(code: string): Promise<Coupon>;
  getActiveCoupons(): Promise<CouponItem[]>;
  getExpiredCoupons(): Promise<CouponItem[]>;
  createCoupon(coupon: CouponItem): Promise<Coupon>;
  activeToogleCoupons({ id, isActive }: ToogleCoupon): Promise<boolean>;
  deleteCoupon(id: string): Promise<CouponItem[]>;
  getCouponById(discountId:string):Promise<Coupon>
}

export interface ICouponInCartRepository{
  updateCartWithCoupon(data: ApplyCouponCart): Promise<ApplyCouponCart[]>
  removeCoupon(
    data: RemoveDiscountCodeDto
  ): Promise<ApplyCouponCart[]>
  getCouponsInCart(
    data:getCouponInCartDto
  ): Promise<CouponInCartItem>
}