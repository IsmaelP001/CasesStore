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
  user as userTable,
} from "../../../database/schemes";
import { eq, and, AnyColumn, sql, ne } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "../../../database/db";
import { getUserSession } from "../../../lib/auth";
import { phonenumberSchema } from "../../../lib/schemas/phonenumberSchema";
import { newAddressScheme } from "../../../lib/schemas/newAdressSheme";
import { giftScheme } from "../../../lib/schemas/giftScheme";

export const createNewAddress = async (FormData) => {
  const data = Object.fromEntries(FormData);
  const { user } = (await getUserSession()) || {};

  if (!user) {
    return redirect("/auth/signin");
  }

  const result = newAddressScheme.safeParse(data);

  if (!result.success)
    return { _error: result?.error?.formErrors?.fieldErrors };

  try {
    const [newAddress] = await db
      .insert(address)
      .values({ ...result.data, userId: user?.id })
      .returning();
    await db
      .insert(defaultAddress)
      .values({ addressId: newAddress?.id, userId: user?.id })
      .onConflictDoUpdate({
        target: defaultAddress.userId,
        set: { addressId: newAddress?.id },
      });
  } catch (err) {
    console.log("error", err);
  }
};

export const updateDefaultAddress = async ({ addressId }) => {
  const { user } = (await getUserSession()) || {};

  if (!user) {
    return redirect("/auth/signin");
  }

  try {
    await db
      .insert(defaultAddress)
      .values({ addressId, userId: user?.id })
      .onConflictDoUpdate({
        target: defaultAddress.userId,
        set: { addressId },
      });
  } catch (err) {
    return false;
  }
};

export const updateAddress = async (FormData) => {
  const data = Object.fromEntries(FormData);
  const { user } = (await getUserSession()) || {};

  if (!user) {
    return redirect("/auth/signin");
  }

  const result = newAddressScheme.safeParse(data);
  if (!result.success)
    return { _error: result?.error?.formErrors?.fieldErrors };

  try {
    await db
      .update(address)
      .set({ ...result.data })
      .where(eq(address.id, result.data.addressId));
    return true;
  } catch (err) {
    console.log("error updating address", err);
    return false;
  }
};

export const deleteAddress = async ({ addressId }) => {
  const { user } = (await getUserSession()) || null;

  if (!user) {
    return redirect("/auth/signin");
  }
  try {
    await db
      .delete(address)
      .where(and(eq(address.id, addressId), eq(address.userId, user?.id)));
  } catch (err) {
    console.log("error deleting address", err);
  }
};

export const createNewGift = async (data) => {
  const { user } = (await getUserSession()) || null;

  if (!user) {
    return redirect("/auth/signin");
  }

  const result = giftScheme.safeParse(data);

  if (!result.success)
    return { _error: result?.error?.formErrors?.fieldErrors };

  try {
    const [newGift] = await db
      .insert(gift)
      .values({ ...result.data, userId: user?.id })
      .returning();
    await db
      .insert(defaultGift)
      .values({ giftId: newGift?.id, userId: user?.id })
      .onConflictDoUpdate({
        target: defaultGift.userId,
        set: { giftId: newGift?.id },
      });
  } catch (err) {
    console.log("error", err);
  }
};

export const updateGiftInfo = async (data) => {
  const { user } = (await getUserSession()) || null;

  if (!user) {
    return redirect("/auth/signin");
  }

  const result = giftScheme.safeParse(data);
  if (!result.success)
    return { _error: result?.error?.formErrors?.fieldErrors };

  try {
    await db
      .update(gift)
      .set({ ...result.data })
      .where(eq(gift.id, newGiftInfo.giftId));
    return true;
  } catch (err) {
    console.log("error", err);
    return false;
  }
};

export const updateDefaultGift = async ({ giftId, userId }) => {
  const { user } = (await getUserSession()) || null;

  if (!user) {
    return redirect("/auth/signin");
  }
  try {
    await db
      .insert(defaultGift)
      .values({ giftId, userId: user?.id })
      .onConflictDoUpdate({ target: defaultGift.userId, set: { giftId } });
    return true;
  } catch (err) {
    console.log("errr default gift", err);
    return false;
  }
};

export const deleteGift = async ({ giftId, userId }) => {
  const { user } = (await getUserSession()) || null;

  if (!user) {
    return redirect("/auth/signin");
  }
  try {
    await db
      .delete(gift)
      .where(and(eq(gift.id, giftId), eq(gift.userId, user?.id)));
  } catch (err) {
    console.log("error deleting address", err);
  }
};

export const updatePhoneNumber = async (FormData) => {
  const { phonenumber } = Object.fromEntries(FormData);
  const { user } = (await getUserSession()) || {};

  if (!user) {
    return redirect("/auth/signin");
  }
  const result = phonenumberSchema.safeParse(phonenumber);

  if (!result.success) return result.error.format();

  try {
    await db
      .update(userTable)
      .set({ phonenumber: result?.data })
      .where(eq(userTable.id, user?.id));
    return true;
  } catch (err) {
    console.log("error updating phone number", err);
    return false;
  }
};

export const applyCouponToCart = async (FormData) => {
  const code = FormData?.get("code");
  const { user } = await getUserSession();


  if (!user) {
    return redirect("/auth/signin");
  }
  const currentDate = new Date();
  currentDate.setMinutes(
    currentDate.getMinutes() - currentDate.getTimezoneOffset()
  );

  try {
    const coupon = await db.query.discountCode.findFirst({
      where: eq(discountCode.code, code),
    });

    // console.log('coupon',coupon)
    if (!coupon) return { _error: "Coupon no existe" };

    if (coupon.uses >= coupon.limit)
      return { _error: "Limite de uso alcanzado" };

    if (coupon.expiresAt < currentDate)
      return { _error: "Este coupon ya ha expirado" };

    let applicableProductId = null;
    if (coupon?.productIds?.length > 0) {
      const inCartItems = await db.query.cartDetails.findMany({
        where: eq(cartDetails.cartId, user?.cartId),
      });
      const inCartProductIds = inCartItems.map((product) => product.productId);

      const applicableProduct = coupon?.productIds.find((id) =>
        inCartProductIds.includes(id)
      );
      console.log("productIdc", applicableProduct);
      if (!applicableProduct)
        return { _error: "Este coupon no es valido a estos productos" };
      applicableProductId = applicableProduct;
    }

    await db
      .update(cartDetails)
      .set({ discountId: coupon.id })
      .where(
        and(
          eq(cartDetails.cartId, user?.cartId),
          eq(cartDetails.productId, applicableProductId)
        )
      )
      
    return true;
  } catch (err) {
    console.log("errror", err);
    return false;
  }
};


export const removeCouponFromCart = async(cartDetailsId)=>{
  const { user } = await getUserSession();

  console.log('cartDetails',cartDetailsId)

  if (!user) {
    return redirect("/auth/signin");
  }

  try{
    await db.update(cartDetails).set({discountId:null}).where(eq(cartDetails.id,cartDetailsId))
  }catch(err){
    console.log('error removing coupon',err)
  }
}
