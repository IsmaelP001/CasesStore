import { serverHelpers } from "@/lib/trpc/serverHelper";
import DesignConfiguratorContainer from "./_components/DesignConfiguratorContainer";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { DesignProviderV2 } from "./hooks/useDesign-contextV2";
export const revalidate = 0;

const page = async () => {
  serverHelpers.catalog.getProductsByType.prefetch({
    productType: "CUSTOM_CASE_MATERIAL",
  });

  serverHelpers.catalog.getDevices.prefetch();

  return (
    <>
      <HydrationBoundary state={dehydrate(serverHelpers.queryClient)}>
        <DesignProviderV2>
          <DesignConfiguratorContainer />
        </DesignProviderV2>    
      </HydrationBoundary>
    </>
  );
};

export default page;
