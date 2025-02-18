import { favoriteSchema } from "@/lib/schemas/favoriteSchema";
import { AuthMiddleware, publicProcedure, router } from "../../server/trpc";
import { favoriteServiceFacade } from "../user/application";
import { z } from "zod";


export const favoriteRouter = router({
  getUserFavorites:publicProcedure.use(AuthMiddleware).query(async({ctx})=>{
    const userId=ctx.session.user.id
    const data = await favoriteServiceFacade.userFavorites(userId!)
    return data
  }),
  addItem: publicProcedure
    .input(favoriteSchema)
    .use(AuthMiddleware)
    .mutation(async ({ input, ctx }) => {
      console.log('user favorite',ctx.session)
      const userId=ctx.session.user.id
      const favorite={userId:userId!,productId:input.productId}
      return await favoriteServiceFacade.addItem(favorite);
    }),
    removeItem: publicProcedure
    .input(favoriteSchema)
    .use(AuthMiddleware)
    .mutation(async ({ input, ctx }) => {
      const userId=ctx.session.user.id
      const favorite={userId:userId!,productId:input.productId}
      return await favoriteServiceFacade.removeItem(favorite);
    }),
});
