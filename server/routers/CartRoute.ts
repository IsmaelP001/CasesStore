import { AuthMiddleware, publicProcedure, router } from "../../server/trpc";
import {
  cartItemSchema,
} from "@/lib/schemas/cartItemSchema";
import { defaultCartFacade } from "@/server/cart/application/facade";
import { z } from "zod";

export const cartRouter = router({
  addItem: publicProcedure
    .input(cartItemSchema)
    .use(AuthMiddleware)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx?.session?.user?.id!;
      const data = await defaultCartFacade.createItem({ ...input, userId });
      return data;
    }),
  getItems: publicProcedure.use(AuthMiddleware).query(async ({ ctx }) => {
    const userId = ctx?.session.user.id!;
    const data = await defaultCartFacade.getCartItems(userId);
    return data;
  }),
  getTotalCart: publicProcedure
    .use(AuthMiddleware)
    .input(z.object({ cartId: z.string() }))
    .query(async ({ input, ctx }) => {
      return await defaultCartFacade.getTotalsInCart(input.cartId);
    }),
});
