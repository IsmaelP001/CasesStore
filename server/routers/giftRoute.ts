import { z } from "zod";
import { AuthMiddleware, publicProcedure, router } from "../../server/trpc";
import { giftScheme } from "@/lib/schemas/giftScheme";
import { giftServiceFacade } from "../user/application";


export const giftRouter = router({
  getUserGift: publicProcedure.use(AuthMiddleware).query(async ({ ctx }) => {
    const userId= ctx.session.user.id!
    return await giftServiceFacade.getUserGifts(userId)
  }),
  getDefaultGift: publicProcedure.use(AuthMiddleware).query(async ({ ctx }) => {
    const userId= ctx.session.user.id!
    return await giftServiceFacade.getActiveUserGift(userId)
  }),
  createGift: publicProcedure
    .use(AuthMiddleware)
    .input(giftScheme)
    .mutation(async ({ ctx, input }) => {
      const userId= ctx.session.user.id!
      return await giftServiceFacade.createGiftAndSetDefault({
        ...input,
        userId
      });
    }),
  updateDefaulfGift: publicProcedure
    .use(AuthMiddleware)
    .input(
      z.object({
        giftId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId= ctx.session.user.id!
      return await giftServiceFacade.setActivetGiftUser(input.giftId,userId)
    }),
  removeDefaulfGift: publicProcedure
    .use(AuthMiddleware)
    .mutation(async ({ ctx }) => {
      const userId= ctx.session.user.id!
      return await giftServiceFacade.removeDefaultGift(userId)
    }),
  updateGift: publicProcedure
    .use(AuthMiddleware)
    .input(giftScheme.extend({
      id:z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      const userId= ctx.session.user.id!
      return await giftServiceFacade.updateGiftUser({...input,userId})
    }),
  deleteGift: publicProcedure
    .use(AuthMiddleware)
    .input(
      z.object({
        giftId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId= ctx.session.user.id!
      return await giftServiceFacade.deleteGiftUser(input.giftId,userId)
    }),
});
