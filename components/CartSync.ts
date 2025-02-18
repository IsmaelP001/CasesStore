'use client'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useAppSelector } from "@/config/redux/hooks";

const CartSync = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const cartItems = useAppSelector(store=>store.cartState.items) 
  useEffect(() => {
    if (status === "authenticated" && cartItems.length) {
      const syncCartAndClear = async () => {
        try {
          const response = await fetch("/api/syncCart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
         
            localStorage.removeItem("cart"); 
          } else {
            console.error("Error syncing cart");
          }
        } catch (error) {
          console.error("Error syncing cart:", error);
        }
      };

      syncCartAndClear();
    }
  }, [status,  session, dispatch]);

  return null;
};

export default CartSync;
