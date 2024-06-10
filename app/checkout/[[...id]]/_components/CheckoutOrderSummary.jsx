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
    <div className=''>
      <h2 className="self-center font-bold text-xl mb-6 ">Resumen de orden</h2>

      <div className="">
        <div className="max-w-[85%] m-auto">
          <CartTotalBtn />
        </div>
        <CartItemsContainer />
      </div>
      
      <div className='mt-5'>
      <CouponDiscountModal/>

      </div>
    </div>
  );
};

export default CheckoutOrderSummary;
