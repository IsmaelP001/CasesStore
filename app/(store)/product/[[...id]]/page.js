import { getProductById } from "../../../../lib/data/products";
import SingleProductPage from "../_components/SingleProductPage"
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
    prefetchQuery,
  } from "@tanstack/react-query";


const page = async ({params,searchParams}) => {
    const queryClient = new QueryClient();
    const [id]=params?.id

    await queryClient.prefetchQuery({
        queryKey:['singleProduct',id],
        queryFn:()=>getProductById(id)
    })
    

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SingleProductPage  id={id} searchParams={searchParams}/>
    </HydrationBoundary>
  )
}

export default page