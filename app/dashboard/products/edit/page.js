
import {
  getCollections,
  getColors,
  getPrintPatterns,
  getMaterials,
  getCompatibleProducts,
  getProductById,
} from "../../../../lib/data/products"
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  prefetchQuery,
} from "@tanstack/react-query";
import EditProductPage from './EditProductPage'
import { notFound } from "next/navigation";

const page = async ({searchParams}) => {
  const queryClient = new QueryClient();

  if(!searchParams?.id){
    return notFound()
  }

  const data = await  queryClient.fetchQuery({
    queryKey: ["productById",searchParams?.id],
    queryFn: ()=>getProductById(searchParams?.id),
  })

  if(!data){
    return notFound()
  }
 
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
          <EditProductPage searchParams={searchParams}  />
    </HydrationBoundary>
  );
};

export default page;
