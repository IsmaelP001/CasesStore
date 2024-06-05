"use client";
import { MdOutlineDiscount } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import CartTotalBtn from "../../../../components/cart/CartTotalBtn";
import CouponDiscountModal from "./CouponDiscountModal"
import CartItemsContainer from '../../../../components/cart/CartItemsContainer'
import { Button } from "../../../../components/ui/button";
const CheckoutOrderSummary = () => {
  const handleModalPromoCode = () => {
    
  };

  return (
    <div>
      <h2 className="self-center font-bold text-xl mb-6 ">Resumen de orden</h2>

      <div className="">
        <div className="max-w-[85%] m-auto">
          <CartTotalBtn />
        </div>
        <CartItemsContainer />
      </div>
      <div className="mt-5 rounded-md  ">
        <Button className=" flex  rounded-md justify-between w-full" onClick={()=>document.getElementById("modalCoupon").showModal()}>
          <div className="flex items-center gap-2">
            <MdOutlineDiscount className="text-xl" />
            <spam className="text-sm">Codigo de descuento o promocion</spam>
          </div>
          <MdKeyboardArrowRight className=" text-2xl" />
        </Button>
      </div>
      <CouponDiscountModal/>

    </div>
  );
};

export default CheckoutOrderSummary;
