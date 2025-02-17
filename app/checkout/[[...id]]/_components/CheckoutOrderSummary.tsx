"use client";
import CouponDiscountModal from "./CouponDiscountModal";
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorBoundary from "@/components/ErrorBoundary";

const CheckoutTotals = lazy(() => import("./CheckoutTotals"));
const CartItemsContainer = lazy(
  () => import("@/components/cart/CartItemsContainer")
);
const CreateOrderBtn = lazy(() => import("./CreateOrderBtn"));

const CheckoutOrderSummary = () => {

  
  return (
    <div className=" m-auto w-full md:max-w-[450px]">
      <h2 className="self-center font-bold text-xl mb-6 ">Resumen de orden</h2>
      <div className=" w-full space-y-5">
        <ErrorBoundary
          fallback={
            <div>
              Ocurrió un error al cargar el botón de creación de la orden. Por
              favor, intenta recargar la página.
            </div>
          }
        >
          <Suspense>
            <CreateOrderBtn />
          </Suspense>
        </ErrorBoundary>

        <div >
        <ErrorBoundary
          fallback={
            <div>
              Ocurrió un error al cargar los artículos en el carrito. Por favor,
              intenta recargar la página.
            </div>
          }
        >
          <Suspense fallback={<Skeleton className="h-[80px] w-full" />}>
            <CartItemsContainer />
          </Suspense>
        </ErrorBoundary>
        </div>

        <div>
          <CouponDiscountModal/>
        </div>

        <ErrorBoundary
          fallback={
            <div>
              Ocurrió un error al calcular el total del pedido. Por favor,
              intenta recargar la página.
            </div>
          }
        >
          <Suspense fallback={<Skeleton className="h-[130px] w-full" />}>
            <CheckoutTotals />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default CheckoutOrderSummary;
