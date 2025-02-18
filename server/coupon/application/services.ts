import { AddCouponToCart, ApplyCouponCart, Coupon, CouponInCartItem, CouponItem, ToogleCoupon } from "../domain/models";
import { getCouponInCartDto, RemoveDiscountCodeDto } from "./dto";

export interface ICouponService{
  getCouponOrThrow(code: string):Promise<Coupon> 
  getActiveCoupons():Promise<CouponItem[]>
  getExpiredCoupons(): Promise<CouponItem[]>
   createCoupon(coupon:CouponItem):Promise<Coupon>
   activeToogleCoupons(params: ToogleCoupon): Promise<boolean>;
   deleteCoupon(id: string): Promise<CouponItem[]>;
   addCouponToCart({cartId,coupon}:AddCouponToCart): Promise<ApplyCouponCart[]>
   removeCouponFromCart(
    data:RemoveDiscountCodeDto
  ): Promise<ApplyCouponCart[]>
  getCouponsInCart(
    data:getCouponInCartDto
  ): Promise<CouponInCartItem>
  getCouponById(discountId:string):Promise<Coupon>}
  