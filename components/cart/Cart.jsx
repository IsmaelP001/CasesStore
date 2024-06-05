'use client';
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTotalPrice, getCartItems } from "../../lib/data/cart";
import { IoMdClose } from "react-icons/io";
import CartTotalBtn from "../cart/CartTotalBtn";
import CartItemsContainer from "../cart/CartItemsContainer";
import CartEmpty from "../cart/CartEmpty";
import { Button } from "../ui/button";
import { Drawer } from "vaul";
import { Sidebar } from "lucide-react";
import { redirect } from "next/navigation";
import { GrCart } from "react-icons/gr";

const Cart = () => {
  const { data: cartItems, isPending } = useQuery({
    queryKey: ["cartInfo"],
    queryFn: async () => await getCartItems(),
    refetchOnMount: "always",
  });

  


  return (
    <div className="space-y-10 bg-base-200 min-h-full min-w-[315px] py-5">
      
      {cartItems?.length > 0 ? (
        <>
          <div className="max-w-[85%] m-auto">
            <CartTotalBtn />
          </div>
          <CartItemsContainer />
        </>
      ) : (
        <CartEmpty />
      )}
    </div>
  );
};




function CartDrawer() {
  return (
    <Drawer.Root direction="right">
      <Drawer.Trigger asChild>
        <div className=" relative text-xs">
           <GrCart className="text-xl"/>
          <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-primary grid place-content-center text-xs font-semibold text-primary-foreground">5</span>
        </div>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed z-[888] inset-0 bg-black/40" />
        <Drawer.Content className="bg-white flex flex-col  h-full w-[360px] fixed bottom-0 right-0 z-[999]">
          <div className=''>
            <header className="flex justify-between items-center p-6">
            <Drawer.Title className="text-3xl font-semibold ">Tu Carrito</Drawer.Title>
            <Drawer.Close>
              <Button variant="ghost" className="text-xl">X</Button>
            </Drawer.Close>
            </header>
            <Cart/>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export default CartDrawer;
