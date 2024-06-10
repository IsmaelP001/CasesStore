"use server";
import {
  address,
  defaultAddress,
  defaultGift,
  gift,
  user as userTable,
} from "../../../database/schemes";
import {
  eq,
  sql,
  sum,
  number,
  or,
  lte,
  not,
  gt,
  and,
  ne,
  asc,
  isNotNull,
  inArray,
} from "drizzle-orm";

import { db } from "../../../database/db";
import { auth } from "../../../services/auth";
import { getUserSession } from "../../../lib/auth";
import { redirect } from "next/navigation";

export const getUserData = async () => {
  const { user } = await getUserSession() || {}

  try {
    if (!user) {
      return redirect("/auth/signin");
    }

    const currentUser = await db.query.user.findFirst({
      where: eq(userTable.id, user?.id),
    });

    return currentUser;
  } catch (err) {
    console.log("error changeing phone number", err);
  }
};

export const getUserAddresses = async () => {
  const {user}= await getUserSession() || {}

  try {
    if (!user) {
      return redirect("/auth/signin");
    }

    const addresses = await db.query.address.findMany({
      where: eq(address.userId, user?.id),
    });

    return addresses;
  } catch (err) {
    console.log("error getting user address,", err);
  }
};

export const getDefaultAddress = async () => {
  const {user}= await getUserSession() || {}

  if (!user) {
    return redirect("/auth/signin");
  }

  try {
    const address = await db.query.defaultAddress.findFirst({
      where: eq(defaultAddress.userId, user?.id),
      with: {
        address: true,
      },
    });

    return address || null;
  } catch (err) {
    console.log("ERROR GETTING DATA");
  }
};

export const getUserGift = async () => {
  const {user}= await getUserSession() || {}

  if (!user) {
    return redirect("/auth/signin");
  }

  try {
    const gifts = await db.query.gift.findMany({
      where: eq(gift.userId, user?.id),
    });

    return gifts;
  } catch (err) {
    console.log("error getting gift data", err);
    return false;
  }
};

export const getDefaultGift = async () => {
  const {user}= await getUserSession() || {}

  if (!user) {
    return redirect("/auth/signin");
  }

  try {
    const address = await db.query.defaultGift.findFirst({
      where: eq(defaultGift.userId, user?.id),
      with: {
        gift: true,
      },
    });

    return address ?? [];
  } catch (err) {
    console.log("error getting default gift data", err);
    return false;
  }
};
