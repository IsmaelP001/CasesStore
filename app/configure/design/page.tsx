import { serverHelpers } from "@/lib/trpc/serverHelper";
import DesignConfigurator from "./_components/DesignConfigurator";
import { DesignProvider } from "./hooks/useDesign-context";
export const revalidate = 0;

const page = async () => {
  serverHelpers.catalog.getProductsByType.prefetch({
    productType: "CUSTOM_CASE_MATERIAL",
  });

  serverHelpers.catalog.getDevices.prefetch();

  return (
    <>
      <DesignProvider>
        <DesignConfigurator />
      </DesignProvider>
    </>
  );
};

export default page;
