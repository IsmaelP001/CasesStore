"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../store/storeRedux";
import { SessionProvider as NextAuthProvider } from "next-auth/react";
import { Toaster } from "../components/ui/toaster";

const ProviderClient = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <ReduxProvider store={store}>
      <NextAuthProvider>
        <QueryClientProvider client={queryClient}>
          <main>{ children }</main>
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </NextAuthProvider>
    </ReduxProvider>
  );
};

export default ProviderClient;
