"use client";
import { trpc } from "@/lib/trpc/client";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const useCartData = () => {
  const {
    data: cartItems,
    isFetching: isFetchingCartItems,
    isError,
    refetch,
  } = trpc.cart.getItems.useQuery(undefined, {});
  const renderFirstTime = useRef(true);
  const seccion = useSession();
  useEffect(() => {
    if (renderFirstTime.current) {
      renderFirstTime.current = false;
      return;
    }
    refetch();
  }, [seccion?.status]);

  const calculateGrossTotalFromDb = useCallback(() => {
    if (cartItems?.items) {
      return cartItems.items.reduce(
        (acc, { price, quantity }) => acc + parseFloat(price) * quantity,
        0
      );
    }
    return 0;
  }, [cartItems?.items]);

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

  const isPending = isFetchingCartItems || status === "loading";

  return {
    cartItems: cartItems?.items,
    count: cartItems?.items?.length || 0,
    isPending,
    isError,
    total: inCartTotals,
    activeCartId: cartItems?.cartId || "",
  };
};

export default useCartData;
