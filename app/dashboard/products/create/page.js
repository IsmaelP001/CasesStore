
import {
  getCollections,
  getColors,
  getPrintPatterns,
  getMaterials,
  getCompatibleProducts,
} from "../../../../lib/data/products"
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  prefetchQuery,
} from "@tanstack/react-query";
import NewProductPage from './NewProductPage'

const page = async () => {
  const queryClient = new QueryClient();

 
  const data = await Promise.all([
    queryClient.fetchQuery({
      queryKey: ["collections"],
      queryFn: getCollections,
    }),
    queryClient.fetchQuery({ queryKey: ["colors"], queryFn: getColors }),
    queryClient.fetchQuery({
      queryKey: ["printpatterns"],
      queryFn: getPrintPatterns,
    }),
    queryClient.fetchQuery({ queryKey: ["materials"], queryFn: getMaterials }),
    queryClient.fetchQuery({ queryKey: ["compatibleproducts"], queryFn: getCompatibleProducts }),

  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
          <NewProductPage  />
    </HydrationBoundary>
  );
};

export default page;
