'use server'
import { db } from "@/config/database/db";

export const createContext = async () => {


  if (typeof window !== 'undefined') {

  }

  return {
    db,
    
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
