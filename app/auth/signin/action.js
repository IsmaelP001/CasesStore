"use server";

import { address, cart, cartDetails, defaultAddress, defaultGift, discountCode, gift, productDiscount, user } from "../../../database/schemes"
import { eq ,and, AnyColumn, sql, ne} from "drizzle-orm";
   import { cookies } from "next/headers";
import { redirect } from "next/navigation"
import { generateToken } from "../../../services/auth";
import { db } from "../../../database/db";
import { signIn } from "next-auth/react";

export const signin = async (FormData) => {
  //validar data con Z antes de enviar request
    const { username:email, password } = Object.fromEntries(FormData);
    signIn('credentials',{
      email,
      password,
      callbackUrl:'/'
    })
    try {
     
       
    
      return redirect('/')

    } catch (err) {
      console.log(err);
      throw err;
    }
};

