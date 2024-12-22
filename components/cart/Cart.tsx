"use client";
import React, { useEffect, useState, useMemo } from "react";
import CartTotalBtn from "./CartTotalBtn";
import { Button } from "../ui/button";
import { Drawer } from "vaul";
import { useDispatch } from "react-redux";
import { cn } from "../../lib/utils/utils";
import CartItemsContainer from "./CartItemsContainer";
import { ShoppingCart } from "lucide-react";
import Loading from "../Loading";
import { setIsCartOpen } from "@/redux/features/order/orderSlice";
import useCartData from "@/hooks/useCartData";
import { useAppSelector } from "@/redux/hooks";

const Cart = () => {
  const {cartItems}=useCartData()
  return (
    <div className="space-y-5">
      {cartItems?.length! > 0  && (
        <div className="max-w-[85%] m-auto">
        <CartTotalBtn/>
        </div>
      )}
     <CartItemsContainer/>
    </div>
  );
};

function CartDrawer() {
  const isCartOpen = useAppSelector((state) => state.orderState.isCartOpen);
  const [open, setOpen] = useState(false);
  const dispath = useDispatch();

  const { count, isPending } = useCartData();

  useEffect(() => {
    setOpen(isCartOpen);
    dispath(setIsCartOpen({ isCartOpen: false }));
  }, [isCartOpen, dispath]);

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} direction="right">
      <Drawer.Trigger asChild>
        <div className=" relative text-xs">
          <ShoppingCart />
          <span
            className={cn(
              " absolute -top-2 text-white grid place-content-center font-semibold -right-1 min-w-4 min-h-4 rounded-full ",
              !count && !isPending ? "bg-transparent" : "bg-secondary"
            )}
          >
            {isPending ? <Loading size={10} /> : count}
          </span>
        </div>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed z-[888] inset-0 bg-black/40" />
        <Drawer.Content className="bg-white overflow-y-scroll flex flex-col  h-full w-[360px] fixed bottom-0 right-0 z-[999]">
          <div className="">
            <header className="flex justify-between items-center p-6">
              <Drawer.Title className="text-3xl font-semibold ">
                Tu Carrito
              </Drawer.Title>
              <Drawer.Close>
                <Button variant="ghost" className="text-xl">
                  X
                </Button>
              </Drawer.Close>
            </header>
            <Cart />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export default CartDrawer;
