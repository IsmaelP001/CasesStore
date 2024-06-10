"use client";
import { useState } from "react";

//ICONOS
import { FaAddressCard } from "react-icons/fa";
import { SlPaypal } from "react-icons/sl";
import { IoLogoWhatsapp } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineLocalPhone } from "react-icons/md";
import { FaHouse } from "react-icons/fa6";
import { FaGifts } from "react-icons/fa6";

// import UserPhonenumber from "../checkout/UserPhonenumber";
import { useQuery } from "@tanstack/react-query";
import { getDefaultAddress, getDefaultGift, getUserData } from "../data";

import dinamic from "next/dynamic";
import { Button } from "../../../../components/ui/button";
import { cn } from "../../../../lib/utils/utils";
import { Label } from "@headlessui/react";

const UserAddressModal = dinamic(() => import("./UserAddressModal"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const UserPhonenumberModal = dinamic(() => import("./UserPhonenumberModal"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const ScheduleDeliveryModal = dinamic(() => import("./ScheduleDeliveryModal"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const UserGiftModal = dinamic(() => import("./UserGiftModal"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const CouponDiscountModal = dinamic(() => import("./CouponDiscountModal"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const CheckoutShippingDetails = () => {

  const [paymentMethod,setPaymentMethod]=useState('card')

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
                onChange={(e)=>setPaymentMethod(e.target.value)}
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
