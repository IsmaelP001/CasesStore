import { serverHelpers } from "@/lib/trpc/serverHelper";
import { DesignProvider } from "./hooks/useDesign-context";
import DesignConfiguratorContainer from "./_components/DesignConfiguratorContainer";
export const revalidate = 0;

const page = async () => {
  // serverHelpers.catalog.getProductsByType.prefetch({
  //   productType: "CUSTOM_CASE_MATERIAL",
  // });

  // serverHelpers.catalog.getDevices.prefetch();

  return (
    <>
      <DesignProvider>
        <DesignConfiguratorContainer />
      </DesignProvider>
    </>
  );
};

export default page;
