"use client";

import { GiTakeMyMoney } from "react-icons/gi";
import { HiOutlineCreditCard } from "react-icons/hi";
import { IoExit } from "react-icons/io5";
import { cn } from "../../../../lib/utils/utils";
import { useDispatch } from "react-redux";
import { setPaymentMethod } from "../../../../config/redux/features/order/orderSlice";
import { GiftProvider } from "../giftContext";
import { AddressProvider } from "../addressContext";
import { lazy, Suspense } from "react";
import { SkeletonFeatures } from "./SkeletonFeatures";
import ErrorBoundary from "@/components/ErrorBoundary";
import ScheduleDeliveryModal from "./ScheduleDeliveryModal";
import { useAppSelector } from "@/config/redux/hooks";

const UserAddressModal = lazy(() => import("./UserAddressModal"));
const UserGiftModal = lazy(() => import("./UserGiftModal"));
const UserPhonenumberModal = lazy(() => import("./UserPhonenumberModal"));

type PaymentOption = {
  value: string;
  icon: React.ElementType;
  label: string;
  color: string;
};



const CheckoutShippingDetails = () => {
  const { paymentMethod,errors } = useAppSelector((state) => state.orderState);
  const dispatch = useDispatch();

  const paymentOptions: PaymentOption[] = [
    {
      value: "card",
      icon: HiOutlineCreditCard,
      label: "tarjeta",
      color: "#3B82F6",
    },
    {
      value: "atDelivery",
      icon: GiTakeMyMoney,
      label: "efectivo en entrega",
      color: "#388E3C",
    },
  ];
  return (
    <div className="w-full space-y-8 m-auto md:max-w-[450px]">
      <section className="w-full">
        <h2 className={cn("font-bold text-xl mb-3 flex items-center",  !paymentMethod && errors?.paymentMethod && 'text-red-500')}>
          <span className="rounded-full bg-primary text-white text-base font-semibold px-2 mr-2">1</span>
          Selecciona tu método de pago
        </h2>

        <div className="flex gap-2">
          {paymentOptions.map(({ value, icon: PaymentTypeIcon, label, color }) => (
            <div
              key={value}
              className={cn("flex flex-1 border py-8 relative rounded-md", {
                "border-primary": value === paymentMethod?.value,
                "border-gray-200": value !== paymentMethod?.value,
              })}
            >
              <input
                id={value}
                type="radio"
                value={value}
                name="paymentOption"
                checked={value === paymentMethod?.value}
                className="hidden"
                onChange={() => dispatch(setPaymentMethod({ label, value }))}
              />
              <label htmlFor={value} className="flex px-2 absolute inset-0 items-center gap-1 cursor-pointer">
                <PaymentTypeIcon
                  style={{
                    color: value === paymentMethod?.value ? color : "black",
                  }}
                  className="text-4xl items-center"
                />
                <p
                  style={{
                    color: value === paymentMethod?.value ? color : "black",
                  }}
                  className="text-sm font-medium capitalize"
                >
                  {label}
                </p>
              </label>
            </div>
          ))}
        </div>

        {!paymentMethod && errors?.paymentMethod && <p className="text-sm pt-1 font-medium text-red-500">Seleccione un metodo de pago valido</p>}
        
        {paymentMethod?.value === "card" && (
          <div className="flex gap-2">
            <IoExit className="w-[50px] h-[50px] mt-2 text-blue-700" />
            <p className="text-sm tracking-wider font-medium mt-3 text-left">
              Al finalizar el pedido serás redirigido a AZUL para completar tu compra de forma segura.
            </p>
          </div>
        )}
      </section>

      <section>
        <h2 className="w-full font-bold text-xl mb-3 flex items-center">
          <span className="rounded-full bg-primary text-white text-base font-semibold px-2 mr-2">2</span>
          Escoge tu método de entrega
        </h2>
        <ScheduleDeliveryModal />
      </section>

      <section className="w-full">
        <h2 className="font-bold text-xl mb-3 flex items-center">
          <span className="rounded-full bg-primary text-white text-base font-semibold px-2 mr-2">3</span>
          Información de envío
        </h2>
        <div className="border border-primary rounded-md">
          <ErrorBoundary fallback={<div>Un error inesperado ha ocurrido...</div>}>
            <Suspense fallback={<SkeletonFeatures />}>
              <UserPhonenumberModal />
            </Suspense>
          </ErrorBoundary>
          
          <div className="border-t border-black" />
          <ErrorBoundary fallback={<div>Un error inesperado ha ocurrido...</div>}>
            <Suspense fallback={<SkeletonFeatures />}>
              <GiftProvider>
                <UserGiftModal />
              </GiftProvider>
            </Suspense>
          </ErrorBoundary>
          
          <div className="border-t border-black" />
          <ErrorBoundary fallback={<div>Un error inesperado ha ocurrido...</div>}>
            <Suspense fallback={<SkeletonFeatures />}>
              <AddressProvider>
                <UserAddressModal />
              </AddressProvider>
            </Suspense>
          </ErrorBoundary>
        </div>
      </section>
    </div>
  );
};

export default CheckoutShippingDetails;
