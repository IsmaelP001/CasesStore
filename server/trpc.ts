import { initTRPC, TRPCError } from "@trpc/server";
import { ZodError } from "zod";
import { createContext } from "../server/context";
import SuperJSON from "superjson";
import { getUserSession } from "@/lib/auth";

const t = initTRPC.context<typeof createContext>().create({
  transformer:SuperJSON,
  errorFormatter(opts) {
    const { shape, error } = opts;
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === "BAD_REQUEST" && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const mergeRouters = t.mergeRouters;



export const AuthMiddleware = t.middleware(async ({ ctx, next }) => {

  
  const session = await getUserSession()

  if(!session){
     throw new TRPCError({
      code:'UNAUTHORIZED',
      message:'Sign in needed for this action'
     })
  }

  return next({
    ctx: {
      session,
    },
  });
});