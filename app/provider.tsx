"use client";

import {
  defaultShouldDehydrateQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { ReactNode, useState } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { SessionProvider as NextAuthProvider } from "next-auth/react";
import { Toaster as ShadcnToaster } from "../components/ui/toaster";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "@/lib/trpc/client";
import SuperJSON from "superjson";
import { store } from "@/config/redux/storeRedux";
import { DesignProvider } from "./configure/design/hooks/useDesign-context";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; //browser whould use relative url
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

const ProviderClient = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000 * 10,
          },
          dehydrate: {
            shouldDehydrateQuery: (query) =>
              defaultShouldDehydrateQuery(query) ||
              query.state.status === "pending",
          },
        },
      })
  );

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          transformer: SuperJSON,
        }),
      ],
    })
  );

  return (
    <ReduxProvider store={store}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <NextAuthProvider>
            <QueryClientProvider client={queryClient}>
              {children}
              <ShadcnToaster />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </NextAuthProvider>
      </trpc.Provider>
    </ReduxProvider>
  );
};

export default ProviderClient;
