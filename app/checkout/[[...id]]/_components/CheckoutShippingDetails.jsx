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
import {
  getDefaultAddress,
  getDefaultGift,
  getUserData
} from "../data";

import dinamic from 'next/dynamic'
import { Button } from "../../../../components/ui/button";


const UserAddressModal=dinamic(()=>import("./UserAddressModal"),{
  loading:()=><p>Loading...</p>,
  ssr:false
})  ;
const UserPhonenumberModal =dinamic(()=>import("./UserPhonenumberModal"),{
  loading:()=><p>Loading...</p>,
  ssr:false
}) ;
const ScheduleDeliveryModal =dinamic(()=>import("./ScheduleDeliveryModal"),{
  loading:()=><p>Loading...</p>,
  ssr:false
}) 

const UserGiftModal =dinamic(()=>import("./UserGiftModal"),{
  loading:()=><p>Loading...</p>,
  ssr:false
})
const CouponDiscountModal =dinamic(()=>import("./CouponDiscountModal"),{
  loading:()=><p>Loading...</p>,
  ssr:false
})

const CheckoutShippingDetails = () => {
  const [deliveryType, setDeliveryType] = useState({
    type: "STANDARD",
    time: null,
  });

 
  

  const openDeliveryModal = () => {
    document.getElementById("scheduleDeliveryModal").showModal();
  };

  const handleDeliveryOption = (e) => {
    const deliveryType = e.currentTarget.dataset.id;
    if (deliveryType === "STANDARD") {
      setDeliveryType({ type: "STANDARD", time: null });
    } else {
      openDeliveryModal();
    }
  };

  const handleSetDeliveryTime = (type, time) => {
    setDeliveryType({ type, time });
  };

  return (
    <div className="grid gap-5">
      <div>
        <h2 className="self-center font-bold text-xl mb-3">Pagar con</h2>
        {[
          {
            value: "modalAddCard",
            icon: FaAddressCard,
            label: "Añadir nueva targeta",
          },
          { value: "paypal", icon: SlPaypal, label: "Paypal" },
          {
            value: "whatsapp",
            icon: IoLogoWhatsapp,
            label: "Pagar con Whatsapp",
          },
          {
            value: "payAtDelivery",
            icon: TbTruckDelivery,
            label: "Pagar contra entrega",
          },
        ].map((option) => (
          <div key={option.value} className="flex gap-3 border p-4 rounded-md">
            <input
              type="radio"
              value={option.value}
              name="paymentOption"
              className="radio radio-neutral"
            />
            <div className="flex gap-2">
              <option.icon className="text-2xl" />
              <p>{option.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* DELIVERY TIME */}
      <div>
        <h2 className="self-center font-bold text-xl mb-3">
          Tiempo de entrega
        </h2>
        <div className="flex gap-4">
          <Button
            data-id="STANDARD"
            className={` bg-transparent w-full text-primary border-2 border-primary p-6 hover:text-secondary rounded-xl ${
              deliveryType.type === "STANDARD" ? "btn-active" : null
            }`}
            onClick={handleDeliveryOption}
          >
            <div>
              <p className="font-semibold mb-1">Standard</p>
              <span className="text-xs font-light">24 horas</span>
            </div>
          </Button>
          <Button
            data-id="SCHEDULE"
            className={`bg-transparent  w-full text-primary border-2 border-primary p-6 hover:text-secondary rounded-xl ${
              deliveryType.type === "SCHEDULE" ? "btn-active" : null
            }`}
            onClick={handleDeliveryOption}
          >
            <div>
              <p className="font-semibold mb-1">Entregar para mas tarde</p>
              {deliveryType?.time ? (
                <span>{deliveryType.time}</span>
              ) : (
                <span className="text-xs font-light">Escoja un tiempo</span>
              )}
            </div>
          </Button>
        </div>
      </div>

      {/* PHONE NUMBER*/}

      <div>
        <h2 className="self-center font-bold text-xl mb-3">
          Numero de contacto
        </h2>
       
        <UserPhonenumberModal />
      </div>
      {/* GIFT INFO */}
      <div className="">
        <h2 className="self-center font-bold text-xl mb-3">
          Enviar como regalo
        </h2>
        <UserGiftModal  />
      </div>

      {/* ADDRESS INFORMATION */}
      <section className="flex flex-col gap-3">
        <h2 className="font-bold text-xl ">Direccion</h2>

        <UserAddressModal  />

      </section>
      <ScheduleDeliveryModal handleSetDeliveryTime={handleSetDeliveryTime} />
    </div>
  );
};

export default CheckoutShippingDetails;
