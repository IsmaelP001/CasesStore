import React, { lazy, Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { serverHelpers } from "@/lib/trpc/serverHelper";
import OrderList from "./_components/OrderList";
export const dynamic = "force-dynamic";

const page = async () => {
  await serverHelpers.order.getOrder.prefetch();
  return (
    <HydrationBoundary state={dehydrate(serverHelpers.queryClient)}>
      <div>
        <header className="mt-5 px-10">
          <h2 className="text-4xl font-bold">Ordenes</h2>
        </header>
        <div className="mt-10 px-5">
          <OrderList />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default page;
