'use server'
import { favoriteServiceFacade } from "../user/application";

export const getUserFavorites = async (userId: string) => {
    return await favoriteServiceFacade.userFavorites(userId);
  };
  
  export const addFavoriteItem = async (userId: string, productId: string) => {
    return await favoriteServiceFacade.addItem({ userId, productId });
  };
  
  export const removeFavoriteItem = async (userId: string, productId: string) => {
    return await favoriteServiceFacade.removeItem({ userId, productId });
  };
  