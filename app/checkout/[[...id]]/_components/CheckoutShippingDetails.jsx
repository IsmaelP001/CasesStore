"use client";
import { useState } from "react";

//ICONOS
import { FaAddressCard } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";


// import UserPhonenumber from "../checkout/UserPhonenumber";

import dinamic from "next/dynamic";
import { cn } from "../../../../lib/utils/utils";

import UserAddressModal from './UserAddressModal'

import UserPhonenumberModal from './UserPhonenumberModal'

import ScheduleDeliveryModal from './ScheduleDeliveryModal'
import { useDispatch, useSelector } from "react-redux";
import { setPaymentMethod } from "../../../../lib/features/cart/cartSlice";


const UserGiftModal = dinamic(() => import("./UserGiftModal"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});


const CheckoutShippingDetails = () => {

  const paymentMethod=useSelector(state=>state.cartState.paymentMethod)

  const dispath = useDispatch()

  return (
    <div className="space-y-10 ">
      <section>
        <h2 className=" font-bold text-xl mb-3 flex items-center">
          {" "}
          <span className=" rounded-full bg-primary text-white text-base font-semibold px-2 mr-2">
            1
          </span>
          Selecciona to metodo de pago{" "}
        </h2>

        <div className="">
          {[
            {
              value: "card",
              icon: FaAddressCard,
              label: "Nueva targeta",
              tw:'#3B82F6'
            },
            {
              value: "whatsapp",
              icon: IoLogoWhatsapp,
              label: "Whatsapp Link",
              tw:'#22C55E'
            },
            {
              value: "delivery",
              icon: TbTruckDelivery,
              label: "Pagar al entregar",
              tw:'#EAB308'
            },
          ].map((option) => (
            <div
             style={{ 
              borderColor: option.value === paymentMethod ? option.tw : 'lightGray',
             }}              key={option.value}
              className={cn('flex border py-2 px-6 rounded-md',  `border-[${option.tw}]`)}
            >
              <input
                id={option.value}
                type="radio"
                value={option.value}
                name="paymentOption"
                checked={option.value === paymentMethod}
                className="hidden"
                onChange={(e)=>dispath(setPaymentMethod({paymentMethod:e.target.value}))}
              />
              <label htmlFor={option.value} className="flex items-center gap-4">
                <option.icon style={{color:option.value === paymentMethod ? option.tw : 'black'}} className="text-2xl  items-center" />
                <p  style={{color:option.value === paymentMethod ? option.tw : 'black'}} className="text-sm font-medium">{option.label}</p>
              </label>
            </div>
          ))}
        </div>
      </section>

      {/* DELIVERY TIME */}
      <section>
        <h2 className=" font-bold text-xl mb-3 flex items-center">
          {" "}
          <span className=" rounded-full bg-primary text-white text-base font-semibold px-2 mr-2">
            2
          </span>
          Escoje tu metodo de entrega{" "}
        </h2>

        <ScheduleDeliveryModal />
      </section>

      {/* PHONE NUMBER*/}
      <section>
        <h2 className=" font-bold text-xl mb-3 flex items-center">
          {" "}
          <span className=" rounded-full bg-primary text-white text-base font-semibold px-2 mr-2">
            3
          </span>
          Informacion de envio{" "}
        </h2>
        <div>
          <UserPhonenumberModal />
          <UserGiftModal />
          <UserAddressModal />
        </div>
      </section>
    </div>
  );
};

export default CheckoutShippingDetails;
