import { z } from "zod";
import {  AuthMiddleware, publicProcedure, router } from "../../server/trpc";
import { userSchema } from "@/lib/schemas/userSchema";
import { authServiceFacade, userServiceFacade } from "../user/application";
import { singUpSchema } from "@/lib/schemas/authSchema";


export const userRouter = router({
  createUser: publicProcedure
  .input(singUpSchema)
  .mutation(async ({ input,ctx }) => {  
    return await authServiceFacade.register({...input,provider:'local'});
  }),
  updateUser: publicProcedure
  .input(userSchema.partial())
  .use(AuthMiddleware)
  .mutation(async ({ input,ctx }) => {  
    const userId=ctx.session.user.id  
    const data = await userServiceFacade.updateUser({...input,userId:userId!});
    return data;
  }),
  getUser: publicProcedure
  .use(AuthMiddleware)
  .query(async ({ ctx }) => {
    const userId=ctx.session.user.id
    const data = await userServiceFacade.getUserById(userId!);
    return data;
  }),
  getAllUsers: publicProcedure
  .use(AuthMiddleware)
  .input(z.object({
    limit:z.number().optional()
  }).optional())
  .query(async ({ ctx,input}) => {
    const data = await userServiceFacade.getAllUsers({limit:input?.limit});
    return data;
  }),
  getTotalCustomers: publicProcedure
  .use(AuthMiddleware)
  .query(async ({ ctx }) => {
    const userId=ctx.session.user.id
    const data = await userServiceFacade.getTotalCustomers()
    return data;
  })
});
