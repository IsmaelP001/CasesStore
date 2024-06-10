"use server";

import {
  address,
  cart,
  cartDetails,
  defaultAddress,
  defaultGift,
  discountCode,
  gift,
  productDiscount,
  user,
} from "../../database/schemes";
import { eq, and, AnyColumn, sql, ne } from "drizzle-orm";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import { auth } from "../../services/auth";
import { db } from "../../database/db";
import { getUserSession } from "../auth";
import { cartItemSchema } from "../schemas/cartItemSchema";

export const addCartItem = async (FormData) => {
  const data = Object.fromEntries(FormData);
  const { rol, user } = (await getUserSession()) || {};

  const parsedData = cartItemSchema.parse(data);
  const cartId = user?.cartId || cookies()?.get("CART_ID")?.value;

  try {
    if (!cartId) {
      const uuidCartId = uuidv4();
      const [newCart] = await db
        .insert(cart)
        .values({ id: uuidCartId })
        .returning({ id: cart.id });
      cookies().set("CART_ID", newCart?.id);
      await db
        .insert(cartDetails)
        .values({ cartId: newCart?.id, ...parsedData });
      return;
    }

    await db.insert(cartDetails).values({ cartId:cartId, ...data });
  } catch (err) {
    console.log("err", err);
    // throw new Error("Occurrio un error, intentelo mas tarde...");
  }
};

export const updateCartQuantity = async ({ cartId, quantity, productId }) => {
  await db
    .update(cartDetails)
    .set({ quantity: quantity })
    .where(
      and(eq(cartDetails.cartId, cartId), eq(cartDetails.productId, productId))
    );
  return { quantity };
};

export const removeCartItem = async ({ id }) => {
  await db.delete(cartDetails).where(eq(cartDetails.id, id));
  return { isDeleted: true };
};
