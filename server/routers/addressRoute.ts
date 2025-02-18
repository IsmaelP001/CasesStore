import { z } from "zod";
import { AuthMiddleware, publicProcedure, router } from "../../server/trpc";
import { addressScheme } from "@/lib/schemas/newAdressSheme";
import { addressServiceFacade } from "../user/application";


export const addressRouter = router({
  getUserAddresses: publicProcedure
    .use(AuthMiddleware)
    .query(async ({ ctx }) => {
      const userId=ctx.session.user.id!
      return await addressServiceFacade.getAllAddresses(userId);
    }),
  getDefaultAddress: publicProcedure
    .use(AuthMiddleware)
    .query(async ({ ctx }) => {
      const userId=ctx.session.user.id!
      return await addressServiceFacade.getActiveUserAddress(userId)
    }),
  createAddress: publicProcedure
    .use(AuthMiddleware)
    .input(addressScheme)
    .mutation(async ({ ctx, input }) => {
      const userId=ctx.session.user.id!
      return await addressServiceFacade.create({
        ...input,
        userId
      });
    }),
  updateDefaultAddress: publicProcedure
    .use(AuthMiddleware)
    .input(
      z.object({
        addressId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId=ctx.session.user.id!
      return await addressServiceFacade.updateDefaultAddress(input.addressId,userId)
    }),
  updateAddress: publicProcedure
    .use(AuthMiddleware)
    .input(addressScheme.extend({
      id:z.string({message:'Direccion no valida'})
    }))
    .mutation(async ({ ctx, input }) => {
      const userId=ctx.session.user.id!
      return await addressServiceFacade.updateAddress({
        ...input,
        userId
      });
    }),
  deleteAddress: publicProcedure
    .use(AuthMiddleware)
    .input(
      z.object({
        addressId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId=ctx.session.user.id!
      return await addressServiceFacade.deleteAddress(input.addressId,userId)
    }),
});
