
import ProductList from './_component/ProductList'
import {serverHelpers}from '../../../lib/trpc/serverHelper'
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
export const dynamic = "force-dynamic";

const ProductPage = async () => {
 await serverHelpers.catalog.getProducts.prefetch()
  return (
    <HydrationBoundary state={dehydrate(serverHelpers.queryClient)}>
       <ProductList />
    </HydrationBoundary>
  );
};

export default ProductPage;
