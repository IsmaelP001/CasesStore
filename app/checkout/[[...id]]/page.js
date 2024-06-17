import {
  getDefaultAddress,
  getDefaultGift,
  getUserData,
  getUserGift,
} from "./data";
import CheckoutOrderSummary from "./_components/CheckoutOrderSummary";
import CheckoutShippingDetails from "./_components/CheckoutShippingDetails";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  prefetchQuery,
} from "@tanstack/react-query";
import Link from "next/link";

const CheckoutPage = async ({ params }) => {
  const queryClient = new QueryClient();

  await Promise.all([
    await queryClient.fetchQuery({
      queryKey: ["user"],
      queryFn: async () => {
        const data = await getUserData();
        return data;
      },
    }),
    await queryClient.fetchQuery({
      queryKey: ["addressD"],
      queryFn: async () => {
        const data = await getDefaultAddress();
        return data;
      },
    }),
    await queryClient.fetchQuery({
      queryKey: ["gift"],
      queryFn: async () => {
        const data = await getDefaultGift();
        return data;
      },
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <nav className="flex  bg-base-200 ">
        <div className="">
          <Link href={"/"} className="btn btn-sm">
            Regresar a la tienda
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="">
            <span className="font-semibold text-primary">Cartago</span>
          </div>
        </div>
      </nav>
      <div className="flex  justify-around p-10 m-10 gap-10  ">
        <CheckoutShippingDetails />
        <CheckoutOrderSummary />
      </div>
    </HydrationBoundary>
  );
};

export default CheckoutPage;
