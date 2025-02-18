
import authOption from "@/app/api/auth/[...nextauth]/route";
import { User, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
type UserSession = {
  user: {
    name?: string;
    email?: string;
    image?: string;
    id?: string;
    cartId?: string;
  };
  rol?: 'admin' | 'customer'
};

type SessionClient = {
  data:UserSession,
  status:'authenticated' | 'loading' | 'unauthenticated'
}


export const getUserSession = async () => {
  const authUserSession = await getServerSession(authOption);
  return authUserSession as UserSession
};


import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10; 
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};
