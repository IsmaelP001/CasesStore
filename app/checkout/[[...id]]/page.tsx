import {
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import Link from "next/link";
import CheckoutShippingDetails from "./_components/CheckoutShippingDetails";
import CheckoutOrderSummary from "./_components/CheckoutOrderSummary";
import { Params, SearchParams } from "@/types";
import { serverHelpers } from "@/lib/trpc/serverHelper";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";

const CheckoutPage = async ({ searchParams }: { searchParams: SearchParams }) => {


  const cartId=searchParams?.cartId
  if(!cartId)return notFound()
    
  serverHelpers.user.getUser.prefetch();
  serverHelpers.userFeatures.gift.getDefaultGift.prefetch();
  serverHelpers.userFeatures.address.getDefaultAddress.prefetch();
  serverHelpers.discountCode.getCouponsInCart.prefetch({cartId});
  serverHelpers.cart.getItems.prefetch();


  return (
    <HydrationBoundary state={dehydrate(serverHelpers.queryClient)}>
      <nav className="flex  bg-base-200 px-4 pt-3">
        <div className="">
          <Link href={"/"} className="flex gap-2">
             <ChevronLeft/> <span>Regresar a la tienda</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="">
            <span className="font-semibold text-primary">Cartago</span>
          </div>
        </div>
      </nav>
      <div className="w-full min-w-full px-4 grid md:grid-cols-10 items-start place-content-stretch gap-10 overflow-hidden mt-14">
      <div className="md:col-span-5">
          <CheckoutShippingDetails />
        </div>
        <div className="md:col-span-5">
          <CheckoutOrderSummary />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default CheckoutPage;
