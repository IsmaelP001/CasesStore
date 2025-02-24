import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { serverHelpers } from "@/lib/trpc/serverHelper";
import { Params, SearchParams } from "@/types";
import { SidebarProvider } from "@/components/ui/sidebar";
import FilterSidebar from "./_components/FilterSidebar";
import FilterSearch from "@/app/(store)/cases/_components/FilterSearch";
import FilterParams from "./_components/FilterParams";
import ErrorBoundary from "@/components/ErrorBoundary";
import SidebarFilterTrigger from "./_components/SidebarFilterTrigger";
import { Suspense } from "react";
import ProductListSkeleton from "./_components/ProductListSkeleton";
import ProductList from "./_components/ProductList";

const page = async ({
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) => {
  serverHelpers.catalog.getProducts.prefetch(searchParams);
  serverHelpers.catalog.getCollections.prefetch();
  serverHelpers.catalog.getPrintPatterns.prefetch();
  serverHelpers.catalog.getMaterials.prefetch();
  serverHelpers.catalog.getDevices.prefetch();
  serverHelpers.catalog.getColors.prefetch();

  return (
    <HydrationBoundary state={dehydrate(serverHelpers.queryClient)}>
      <div className="space-y-1 px-2 md:px-5  flex pt-2">
        <SidebarProvider defaultOpen>
          <FilterSidebar />
          <div className=" w-full min-h-screen gap-5 ">
            <div className="sticky text-2xl md:text-3xl top-0 z-30 w-full py-2 bg-background ">
              {searchParams?.device?.split("%")?.length === 1 ? (
                <h2 className="font-semibold">
                  Fundas para <span className="text-primary first-letter:uppercase">{searchParams?.device}</span>
                </h2>
              ) : searchParams?.device?.split("%")?.length > 1 ? (
                <h2 className="  font-semibold ">
                  Fundas para múltiples dispositivos
                </h2>
              ) : (
                <h2 className="font-semibold ">Todos los dispositivos</h2>
              )}
            </div>
            <div
              className='flex-1 transition-transform duration-300 ease-in-out space-y-2 py-4 '
            >
              <FilterSearch />
              <FilterParams />
              <div className="flex justify-end">
              <SidebarFilterTrigger />
              </div>
              <ErrorBoundary>
                <Suspense
                  key={Object.values(searchParams).toLocaleString()}
                  fallback={<ProductListSkeleton />}
                >
                  <ProductList searchParams={searchParams} />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        </SidebarProvider>
      </div>{" "}
    </HydrationBoundary>
  );
};

export default page;
