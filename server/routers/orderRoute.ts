import { orderSchema } from "@/lib/schemas/orderSchema";
import { AuthMiddleware, publicProcedure, router } from "../../server/trpc";
import { orderFacade } from "../order/application/facade";
import { z } from "zod";

export const orderRouter = router({
  createOrder: publicProcedure
    .use(AuthMiddleware)
    .input(orderSchema)
    .mutation(async ({ input, ctx }) => {
        const userId=ctx?.session?.user?.id!
       await orderFacade.save({...input,userId});
    }),
    getOrder: publicProcedure
    .use(AuthMiddleware)
    .input(z.object({
      cursor:z.string().optional(),
      limit:z.number().optional()
    }).optional())
    .query(async ({ input, ctx }) => {
      const cursor= input?.cursor ? input.cursor : undefined
      return await orderFacade.getOrders({limit:input?.limit,cursor })
    }),
    getMonthlyOrdersTotal: publicProcedure
    .use(AuthMiddleware)
    .input(z.object({
      cursor:z.string()
    }).optional())
    .query(async ({ input, ctx }) => {
      const cursor= input?.cursor ? input.cursor : undefined
      return await orderFacade.getMonthlyOrdersTotal()
    }),
    getTotalOrderRevenue: publicProcedure
    .use(AuthMiddleware)
    .input(z.object({
      cursor:z.string()
    }).optional())
    .query(async ({ input, ctx }) => {
      const cursor= input?.cursor ? input.cursor : undefined
      return await orderFacade.getTotalOrderRevenue()
    }),
});
