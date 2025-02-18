"use server";

import { redirect } from "next/navigation"
import { signIn } from "next-auth/react";
import { AuthSignin } from "@/server/user/domain/auth.model";

export const signin = async ({email,password}:AuthSignin) => {
    signIn('credentials',{
      email,
      password,
      callbackUrl:'/'
    })
    try {
     
      return redirect('/')

    } catch (err) {
      throw err;
    }
};

