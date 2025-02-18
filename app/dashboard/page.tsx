import { serverHelpers } from "@/lib/trpc/serverHelper";

import { lazy, Suspense } from "react";
import Loading from "@/components/Loading";
export const dynamic = "force-dynamic";

const ChartBars = lazy(() => import("./_components/home/ChartOrders"));
const TopSalesProducts = lazy(
  () => import("./_components/home/TopSalesProducts")
);
const UserOrdersResume = lazy(
  () => import("./_components/home/UserOrdersResume")
);
const TopRecentOrders = lazy(
  () => import("./_components/home/TopRecentOrders")
);

const DashboardHomePage = async () => {
  serverHelpers.order.getOrder.prefetch({ limit: 3 });
  serverHelpers.catalog.getTopSalesProducts.prefetch();
  serverHelpers.order.getTotalOrderRevenue.prefetch;
  serverHelpers.user.getTotalCustomers.prefetch();

  return (
    <div className=" px-6  space-y-3 w-full  ">
      <Suspense
        fallback={
          <div>
            <Loading />
          </div>
        }
      >
        <UserOrdersResume />
      </Suspense>

      <div className="flex justify-between gap-10">
        <div className="w-full">
          <Suspense
            fallback={
              <div>
                <Loading />
              </div>
            }
          >
            <ChartBars />
          </Suspense>
        </div>
        <Suspense
          fallback={
            <div>
              <Loading />
            </div>
          }
        >
          <TopSalesProducts />
        </Suspense>
      </div>

      <Suspense
        fallback={
          <div>
            <Loading />
          </div>
        }
      >
        <TopRecentOrders />
      </Suspense>
    </div>
  );
};

export default DashboardHomePage;
