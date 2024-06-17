import { getProducts } from "../../../../lib/data/products";
import FilterProducts from "../_components/FilterProducts";
import FilterParams from "../_components/FilterParams";
import {
  getCollections,
  getColors,
  getPrintPatterns,
  getMaterials,
  getCompatibleProducts,
} from "../../../../lib/data/products"
import ProductPage from "../_components/ProductPage";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  prefetchQuery,
} from "@tanstack/react-query";

const page = async ({ params, searchParams }) => {
  const queryClient = new QueryClient();

  const [id] = params?.id || [];
  const {collection,pattern,material,color}=searchParams

  await queryClient.fetchQuery({
    queryKey: ["cases",collection,pattern,material,color,id],
    queryFn: async () => {
      const data = await getProducts(id, searchParams);
      return data;
    },
  });

  await Promise.all([
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
          <ProductPage params={params} searchParams={searchParams} />
    </HydrationBoundary>
  );
};

export default page;
