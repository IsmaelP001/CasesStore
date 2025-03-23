'use server'
import { discountServiceFacade } from "../coupon/application/facade";

export const getActiveCoupons = async () => {
    return await discountServiceFacade.getActiveCoupons();
  };
  
  export const getExpiredCoupons = async () => {
    return await discountServiceFacade.getExpiredCoupons();
  };
  
  export const createCoupon = async (input:any) => {
    return await discountServiceFacade.createCoupon(input);
  };
  
  export const toggleActiveCoupon = async (id: string, isActive: boolean) => {
    return await discountServiceFacade.activeToogleCoupons({ id, isActive });
  };
  
  export const deleteCoupon = async (id: string) => {
    return await discountServiceFacade.deleteCoupon(id);
  };
  
  export const applyDiscountCode = async (code: string, cartId: string) => {
    return await discountServiceFacade.addCouponToCart({ code, cartId });
  };
  
  export const removeDiscountCodeFromCart = async (discountId: string, cartId: string) => {
    return await discountServiceFacade.removeCouponFromCart({ discountId, cartId });
  };
  
  export const getCouponsInCart = async (userId: string) => {
    return await discountServiceFacade.getCouponsInCart(userId);
  };
  