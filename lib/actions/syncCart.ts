"use server";

import { CartItem } from "@/config/redux/features/cart/cartSlice";
import { defaultCartFacade } from "@/server/cart/application/facade";
import { cookies } from "next/headers";
import { getUserSession } from "../auth";

export const syncCartItems = async (cartItems: CartItem[]) => {
  const cookieStore = await cookies();
  const items = cartItems.map(({ productId, deviceId, quantity, colorId }) => ({
    productId,
    deviceId,
    quantity,
    colorId,
    isAddItemFirstTime:true
  }));

  const { user } = await getUserSession();
  const { cartId } = await defaultCartFacade.initCartAndAddItems(
    items,
    user.id!
  );
  cookieStore.set("CART_ID", cartId);
};
