"use server";

import { address, cart, cartDetails, defaultAddress, defaultGift, discountCode, gift, productDiscount, user } from "../../database/schemes"
import { eq ,and, AnyColumn, sql, ne} from "drizzle-orm";
import bcrypt from "bcrypt";
import { generateToken } from "../../services/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation"
import { db } from "../../database/db";



export const signin = async (FormData) => {
    const { username, password } = Object.fromEntries(FormData);

    try {
      const newUser = await db.query.user.findFirst({
        with:{
            rol:true,
            cart:true
        },
        where: eq(user.email, username),
       
      });

      console.log('user',newUser)
      if (!newUser) return { message: "Usuario no existe" };

      if (!bcrypt.compareSync(password, newUser.password))
        return { message: "Contraseña incorrecta" };
       
      const token = await generateToken({ userId: newUser.id,rol:newUser?.rol?.rol || 'customer' });

      // store JWT in cookie
      const currentDate = new Date();
      const expirationDate = new Date(currentDate.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 días en milisegundos
      cookies().set('jwt',token,{expires:expirationDate,httpOnly:true})
      cookies().set('cartId',newUser.cart.id,{expires:expirationDate,httpOnly:true})
      return redirect('/')

    } catch (err) {
      console.log(err);
      throw err;
    }
};

