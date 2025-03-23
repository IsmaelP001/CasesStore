'use server'
import { defaultCartFacade } from "../cart/application/facade";


  
  export const addItem = async (input: any, userId?: string) => {
    return await defaultCartFacade.createItem({ ...input, userId });
  };
  
  export const updateItemQuantity = async (input: any, userId?: string) => {
    return await defaultCartFacade.updateItemQuantity({ ...input, userId });
  };
  
  export const getItems = async (userId?: string) => {
    return await defaultCartFacade.getCartItems(userId);
  };
  