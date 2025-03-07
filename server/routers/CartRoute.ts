import { getUserSession } from "@/lib/auth";
import { AuthMiddleware, publicProcedure, router } from "../../server/trpc";
import { cartItemSchema } from "@/lib/schemas/cartItemSchema";
import { defaultCartFacade } from "@/server/cart/application/facade";

export const cartRouter = router({
  addItem: publicProcedure
    .input(cartItemSchema)
    .mutation(async ({ input, ctx }) => {
      const session = await getUserSession();
      const userId = session ? session.user.id : undefined;
      return await defaultCartFacade.createItem({ ...input, userId });
    }),
  updateItemQuantity: publicProcedure
    .input(cartItemSchema)
    .mutation(async ({ input, ctx }) => {
      const session = await getUserSession();
      const userId = session ? session.user.id : undefined;
      return await defaultCartFacade.updateItemQuantity({ ...input, userId });
    }),
  getItems: publicProcedure.query(async ({ ctx }) => {
    const session = await getUserSession();
      const userId = session ? session.user.id : undefined;
    return await defaultCartFacade.getCartItems(userId);
    
  }),
});
