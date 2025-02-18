

import { serverHelpers } from "@/lib/trpc/serverHelper"
import DesignConfigurator from "./_components/DesignConfigurator"
export const revalidate = 0

const page = async() => {

  serverHelpers.catalog.getProductsByType.prefetch({
      productType: "CUSTOM_CASE_MATERIAL",
    });

  serverHelpers.catalog.getDevices.prefetch();
  
  

  return (
    <>
        <DesignConfigurator/>
    </>
  )
}

export default page