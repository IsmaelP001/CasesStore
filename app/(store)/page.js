import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  prefetchQuery,
} from "@tanstack/react-query";
import {getCollections, getProducts} from '../../lib/data/products'
import LandingPage from '../../components/landing/LandingPage'
import { getUserSession } from "../../lib/auth";


const page = async () => {
  const queryClient = new QueryClient();
  const user= await getUserSession()

 
  Promise.all([
    await  queryClient.fetchQuery({
      queryKey: ["collections"],
      queryFn: getCollections,
   }),
   await  queryClient.fetchQuery({
    queryKey: ["products"],
    queryFn: ()=>getProducts('iphone'),
   })
  ])


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
     
     <LandingPage />
    
    </HydrationBoundary>
  );
};

export default page;
