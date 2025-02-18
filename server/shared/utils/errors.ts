import { TRPCError } from "@trpc/server";

export function handleError(error: unknown): never {
    if (error instanceof TRPCError) {
      throw error;
    }
    throw new Error("An unespected error happend" + error);
  }