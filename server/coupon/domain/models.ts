import { TRPCError } from "@trpc/server";

export interface CouponItem {
  id?:string
  code:string,
  discountAmount:number,
  discountType:string,
  uses?:number
  isActive?:boolean
  allProducts?:boolean
  productIds?:string[]
  limit?:number
  expiresAt?:Date
}

export interface CouponInCartItem{
  id?:string,
  productId:string,
  discountId:string
  cartId:string
  discountValue:number
  discountCode:string
  coupon?:Coupon
}


export interface ToogleCoupon {
  id:string
  isActive:boolean
}

export interface AddCouponToCart{
  cartId:string,
  coupon:Coupon
}


export interface ApplyCouponCart {
  cartId: string;
  productId: string;
  discountValue:number
  discountId:string,
  discountCode:string
}


export class Coupon {
  constructor(private item: CouponItem) {}

   getItemOrThrow(): CouponItem {
    if (!this.item) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Coupon no existe",
        });
      }
    return this.item;
  }

  get getItem(): CouponItem {
    return this.item;
  }



  validateCouponLimits() {
    if (this.item.limit && this.item?.uses! >= this.item.limit) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Límite de uso alcanzado",
      });
    }
  }

  validateCouponExpiry() {
    const currentDate = new Date();
    currentDate.setMinutes(
      currentDate.getMinutes() - currentDate.getTimezoneOffset()
    );
    if (this.item.expiresAt && this.item.expiresAt < currentDate) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Este coupon ya ha expirado",
      });
    }
  }

  validateCouponApplicability() {
    // if (
    //   (!this?.item?.allProducts && (this?.item?.productIds || []).length <= 0) ||
    //   !this?.item?.isActive
    // ) {
    //   throw new TRPCError({
    //     code: "CONFLICT",
    //     message: "Coupon no válido",
    //   });
    // }
  }
}
