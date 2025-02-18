"use client";

import { syncCartItems } from "@/lib/actions/syncCart";
import { clearCart } from "@/config/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/config/redux/hooks";
import { trpc } from "@/lib/trpc/client";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useMemo, useState } from "react";

const useCartData = () => {
  const { status } = useSession();
  const { items: inCartItemsState, total: totalInCartState } = useAppSelector(
    (store) => store.cartState
  );
  const dispatch = useAppDispatch();
  const [isCartItemsSync, setIsCartItemsSync] = useState<boolean>(false);

  useEffect(() => {
    if (status === "authenticated" && inCartItemsState.length > 0) {
      syncCartItems(inCartItemsState)
        .then(() => dispatch(clearCart()))
        .finally(() => setIsCartItemsSync(true));
    } else if (status === "authenticated") {
      setIsCartItemsSync(true);
    }
  }, [status, dispatch, inCartItemsState]);

  const {
    data: cartItems,
    isFetching: isFetchingCartItems,
    isError,
    error,
  } = trpc.cart.getItems.useQuery(undefined, {
    enabled: status === "authenticated" && isCartItemsSync,
  });

  const actualCartItems = useMemo(() => {
    return status === "authenticated" ? cartItems?.items : inCartItemsState;
  }, [status, cartItems, inCartItemsState]);

  const countItemsInCart = useMemo(() => {
    if (status === "authenticated") {
      const totalQuantity = cartItems?.items?.reduce(
        (acc, { quantity }) => acc + quantity,
        0
      );
      return totalQuantity || 0;
    }
    return (
      inCartItemsState?.reduce((acc, { quantity }) => acc + quantity, 0) || 0
    );
  }, [cartItems, inCartItemsState, status]);

  const calculateGrossTotalFromDb =useCallback( () => {
    if (cartItems?.items) {
      return cartItems.items.reduce(
        (acc, { price, quantity }) => acc + parseFloat(price) * quantity,
        0
      );
    }
    return 0;
  },[cartItems?.items])

  const calculateGrossTotalFromState = useCallback(() => {
    return inCartItemsState.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  },[inCartItemsState])

  const inCartTotals = useMemo(() => {
    let grossTotal = 0;
    if (status === "authenticated") {
      grossTotal = calculateGrossTotalFromDb();
    } else {
      grossTotal = calculateGrossTotalFromState();
    }

    const shipping = 0;
    const itebis = grossTotal * 0.18 || 0;

    return {
      grossTotal,
      itebis,
      shipping,
      subTotal: grossTotal + itebis + shipping,
    };
  }, [status,calculateGrossTotalFromDb,calculateGrossTotalFromState]);

  const isPending = isFetchingCartItems || status === "loading";

  return {
    cartItems: actualCartItems,
    count: countItemsInCart,
    isPending,
    isError,
    total: inCartTotals,
    activeCartId: cartItems?.cartId || "",
  };
};

export default useCartData;
