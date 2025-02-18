import { TRPCError } from "@trpc/server";
import { IDefaultFavoriteRepository } from "../domain/repositories";
import { Favorite } from "../domain/favorite.model";
import { IFavoriteService } from "./services";
import { Product } from "@/server/catalog/domain/product.model";
import { defaultFavoriteRepository } from "../infrastructure/favorite-repositories";

class FavoriteServiceImpl implements IFavoriteService {
  constructor(private favoriteRepository: IDefaultFavoriteRepository) {}

  async userFavorites(userId: string): Promise<Product[]> {
    try {
      return await this.favoriteRepository.userFavorites(userId);
    } catch (error) {
      console.log("error favorites", error);
      throw new Error("Error getting user favorites");
    }
  }

  async addItem(favorite: Favorite): Promise<Favorite> {
    const isProductInFavorite =
      await this.favoriteRepository.isProductFavoriteExist(favorite);

    if (isProductInFavorite) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Este articulo ya esta en tus favoritos",
      });
    }

    return await this.favoriteRepository.createFavorite(favorite);
  }

  async removeItem(favorite: Favorite): Promise<boolean> {
    try {
      return await this.favoriteRepository.removeItem(favorite);
    } catch (error) {
      console.log("error del fav", error);
      throw new Error("Error removing item from favorite");
    }
  }
}

export const defaultFavoriteService = new FavoriteServiceImpl(
  defaultFavoriteRepository
);
