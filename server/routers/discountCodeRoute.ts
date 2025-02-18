import { z } from "zod";
import { AuthMiddleware, publicProcedure, router } from "../../server/trpc";
import { discountServiceFacade } from "../coupon/application/facade";
import { couponScheme } from "@/lib/schemas/couponScheme";


const addCouponToCart=z.object({
    code:z.string(),
})

export const discountCodeRouter = router({
  // removeCoupon: publicProcedure
  //   .input(z.object({ cartDetailsId: z.number() }))
  //   .mutation(async ({input}) => {
  //     return await discountServiceFacade.delete(input);
  //   }),
  //   applyCoupon: publicProcedure
  //   .input(addCouponToCart)
  //   .use(AuthMiddleware)
  //   .mutation(async ({input,ctx}) => {
  //       console.log('code',input)
  //     return await discountServiceFacade.applyCoupon({...input,cartId:ctx.session.user.cartId});
  //   }),
    getActiveCoupons: publicProcedure
    .use(AuthMiddleware)
    .query(async ({input,ctx}) => {
      return await discountServiceFacade.getActiveCoupons()
    }),
    getExpiredCoupons: publicProcedure
    .use(AuthMiddleware)
    .query(async ({input,ctx}) => {
      return await discountServiceFacade.getExpiredCoupons()
    }),
    createCoupon: publicProcedure
    .use(AuthMiddleware)
    .input(couponScheme)
    .mutation(async ({input,ctx}) => {
      return await discountServiceFacade.createCoupon(input)
    }),
    toogleActiveCoupon: publicProcedure
    .use(AuthMiddleware)
    .input(z.object({
      id:z.string(),
      isActive:z.boolean()
    }))
    .mutation(async ({input,ctx}) => {
      return await discountServiceFacade.activeToogleCoupons(input)
    }), 
     deleteCoupon: publicProcedure
    .use(AuthMiddleware)
    .input(z.object({id:z.string()}))
    .mutation(async ({input,ctx}) => {
      return await discountServiceFacade.deleteCoupon(input.id)
    }),
    applyDiscountCode: publicProcedure
    .input(
      z.object({
        code: z.string(),
        cartId:z.string()
      })
    )
    .use(AuthMiddleware)
    .mutation(async ({ input, ctx }) => {
      const data = await discountServiceFacade.addCouponToCart({code:input.code,cartId:input.cartId})
      return data;
    }),
    removeDiscountCodeFromCart: publicProcedure
    .input(
      z.object({
        discountId: z.string(),
        cartId:z.string()
      })
    )
    .use(AuthMiddleware)
    .mutation(async ({ input, ctx }) => {
      const data = await discountServiceFacade.removeCouponFromCart({discountId:input.discountId,cartId:input.cartId})
      return data 
    }),
    getCouponsInCart: publicProcedure
    .use(AuthMiddleware)
    .input(z.object({
      cartId:z.string()
    }))
    .query(async ({input,ctx}) => {
      return await discountServiceFacade.getCouponsInCart(input.cartId) || {}
    }),
});
