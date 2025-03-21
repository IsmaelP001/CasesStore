import { serverHelpers } from "@/lib/trpc/serverHelper";
import { DesignProvider } from "./hooks/useDesign-context";
import DesignConfiguratorContainer from "./_components/DesignConfiguratorContainer";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
export const revalidate = 0;

const page = async () => {
  serverHelpers.catalog.getProductsByType.prefetch({
    productType: "CUSTOM_CASE_MATERIAL",
  });

  serverHelpers.catalog.getDevices.prefetch();

  return (
    <>
      <HydrationBoundary state={dehydrate(serverHelpers.queryClient)}>
        <DesignProvider>
          <DesignConfiguratorContainer />
        </DesignProvider>
      </HydrationBoundary>
    </>
  );
};

export default page;
