'use client'
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IoMdClose } from "react-icons/io";
import CartTotalBtn from "./CartTotalBtn";
import CartItem from './CartItem'
import { getCartItems } from "../../lib/data/cart";

const CartItemsContainer = () => {


  const {data:cartItems,isPending}=useQuery({
    queryKey:['cartInfo'],
    queryFn: async ()=>await getCartItems(),
  })

  
  console.log('cartItems',cartItems)

  return (
    <div className="space-y-10 bg-base-200 min-h-full min-w-[315px]  py-5 ">
     
      {/* CART-ITEMS */}
      
      <div className="firstCartItem">
          {
            cartItems?.map(item=>{
              return <CartItem key={item.id} {...item}/>
            })
          }

        </div>
   </div>
  );
};

export default CartItemsContainer;
