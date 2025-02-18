import { appRouter } from "@/server";
import { createContext } from "@/server/context";
import { createServerSideHelpers } from "@trpc/react-query/server";
import SuperJSON from "superjson";

export const serverHelpers = createServerSideHelpers({
  router: appRouter,
  ctx: await createContext(), 
  transformer: SuperJSON
});
