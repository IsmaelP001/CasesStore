import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { serverHelpers } from "@/lib/trpc/serverHelper";
import { notFound } from "next/navigation";
import { SearchParams, Params } from "@/types";
import SingleProductPage from "../_components/SingleProductPage";

interface PageProps {
  params: Params;
  searchParams: SearchParams;
}

const page = async ({ params }: PageProps) => {
  const [id] = params?.id;

  if (!id) notFound();

  serverHelpers.catalog.getProductsById.prefetch({ id });

  return (
    <HydrationBoundary state={dehydrate(serverHelpers.queryClient)}>
      <SingleProductPage id={id} />
    </HydrationBoundary>
  );
};

export default page;
