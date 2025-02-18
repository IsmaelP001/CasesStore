import { db } from "../../../config/database/db";
import { eq } from "drizzle-orm";
import { configurationimage } from "../../../config/database/schemes";
import {
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { serverHelpers } from "@/lib/trpc/serverHelper";
import dynamic from "next/dynamic";

const DesignPreview = dynamic(() => import("./DesignPreview"), {
  ssr: false,
});

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const page = async ({ searchParams }: PageProps) => {
  const queryClient = serverHelpers.queryClient; 

  const { id } = searchParams;

  let configuration = null;
  if (id && typeof id === "string") {
    configuration = await db.query.configurationimage.findFirst({
      where: eq(configurationimage.id, id),
    });
  }

  await serverHelpers.catalog.getProductsByType.prefetch({
    productType: "CUSTOM_CASE_MATERIAL",
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DesignPreview configuration={configuration || null} />
    </HydrationBoundary>
  );
};

export default page;
