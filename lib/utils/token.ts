import jwt from 'jsonwebtoken'
import { VARIABLES_CONFIG } from './utils';
import { CartStatus } from '@/server/cart/domain/models';

interface Cart {
  id: string;       
  state: CartStatus   
}

export interface PayloadCart {
  sub?:string
  iat: number;     
  exp?: number;     
  cart: Cart;      
}

export function generateToken<T>(payload: T, expiresIn: number): string {
    const secret = VARIABLES_CONFIG.JWT_SECRET!;
  
    return jwt.sign(
      { ...payload, exp: expiresIn },
      secret, 
    );
  }
  
  export function extractPayload<T>(token: string):T | null {
    try {
      const decoded = jwt.decode(token);
      if (token && decoded && typeof decoded === "object") {
        return decoded as T
      }
      return null;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
  