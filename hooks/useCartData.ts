"use client";
import { trpc } from "@/lib/trpc/client";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const useCartData = () => {
  const {
    data: cartItems,
    isFetching: isFetchingCartItems,
    isError,
  } = trpc.cart.getItems.useQuery(undefined, {
    refetchOnMount:false,
    refetchOnWindowFocus:false,
    staleTime:60 * 60 * 15,
    placeholderData:(prev)=>prev
  });
  const renderFirstTime = useRef(true);
  const seccion = useSession();
  const utils = trpc.useUtils();
  useEffect(() => {
    if (renderFirstTime.current) {
      renderFirstTime.current = false;
      return;
    }
    utils.cart.getItems.invalidate()
  }, [seccion]);

  const calculateGrossTotalFromDb = useCallback(() => {
    if (cartItems?.items) {
      return cartItems.items.reduce(
        (acc, { price, quantity }) => acc + parseFloat(price) * quantity,
        0
      );
    }
    return 0;
  }, [cartItems?.items]);

  const inCartQuantity = useMemo(()=>{
    if(!cartItems?.items?.length)return 0
    return cartItems.items.reduce((acc,item)=> acc += item.quantity,0) || 0
  },[cartItems])

  const inCartTotals = useMemo(() => {
    let grossTotal = calculateGrossTotalFromDb();
    const shipping = 0;
    const itebis = grossTotal * 0.18 || 0;

    return {
      grossTotal,
      itebis,
      shipping,
      subTotal: grossTotal + itebis + shipping,
    };
  }, [calculateGrossTotalFromDb, cartItems]);

  const isPending = isFetchingCartItems || seccion?.status === "loading";

  return {
    cartItems: cartItems?.items,
    count: inCartQuantity,
    isPending,
    isError,
    total: inCartTotals,
    activeCartId: cartItems?.cartId || "",
  };
};

export default useCartData;
