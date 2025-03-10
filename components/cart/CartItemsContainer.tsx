"use client";
import React from "react";
import CartItem from "./CartItem";
import useCartData from "@/hooks/useCartData";
import CartEmpty from "./CartEmpty";
import Loading from "../Loading";

const CartItemsContainer = () => {
  const { cartItems,isPending } = useCartData();

  if(isPending){
    return(
      <div className="min-h-[250px] h-full grid place-content-center">
        <Loading/>
      </div>
    )
  }
  return (
    <>
      {cartItems?.length! > 0 && (
        <div>
          <div className="space-y-10 bg-base-200 min-h-full overflow-hidden">
            <div>
              {cartItems?.map((item, index) => (
                <CartItem key={index} item={item as any} />
              ))}
            </div>
          </div>
        </div>
      )}
      {!cartItems?.length  && <CartEmpty />}
    </>
  );
};

export default CartItemsContainer;
