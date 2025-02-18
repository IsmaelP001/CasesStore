"use client";
import React from "react";
import CartItem from "./CartItem";
import useCartData from "@/hooks/useCartData";
import CartEmpty from "./CartEmpty";

const CartItemsContainer = () => {
  const { cartItems, isPending } = useCartData();

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
      {!cartItems?.length && !isPending && <CartEmpty />}
    </>
  );
};

export default CartItemsContainer;
