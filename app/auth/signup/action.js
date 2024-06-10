"use server";

import { address, cart, cartDetails, defaultAddress, defaultGift, discountCode, gift, productDiscount, user } from "../../../database/schemes"
import { eq ,and, AnyColumn, sql, ne} from "drizzle-orm";
import bcrypt from "bcrypt";
import { db } from "../../../database/db";
import { redirect } from "next/navigation"



export const signup = async (FormData) => {
    const { email, password, firstName, lastName } = Object.fromEntries(FormData);
  
    try {
      const currentUser = await db.query.user.findFirst({
          where: eq(user.email, email),
        });
      
      if(currentUser) return {message:'Usuario ya existe, por favor inicie sección.'}
  
      const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.AUTH_ROUNDS));
      const [newUser] = await db
        .insert(user)
        .values({ firstName, lastName, email, password: hashedPassword,provider:'credentials'}).returning()
  
      //crear id del carrito
      await db.insert(cart).values({userId:newUser.id})
       
      return redirect('/auth/signin')
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  