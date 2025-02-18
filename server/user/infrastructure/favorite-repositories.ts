import { favorite as favoriteSchema } from "@/config/database/schemes";
import { BaseRepository } from "@/server/shared/repositories/BaseRepository";
import { and, eq } from "drizzle-orm";
import { IDefaultFavoriteRepository } from "../domain/repositories";
import { Favorite} from "../domain/favorite.model";
import { Product } from "@/server/catalog/domain/product.model";

export class DefaultFavoriteRepositoryImpl
  extends BaseRepository<typeof favoriteSchema, "favorite">
  implements IDefaultFavoriteRepository
{
  constructor() {
    super(favoriteSchema, "favorite");
  }

  async isProductFavoriteExist(
    favorite:Favorite
  ): Promise<boolean> {
    const isProductExist = await this.getFirst({
      filter:{userId:favorite.userId,productId:favorite.productId}
    });
    return isProductExist ? true : false;
  }

  async userFavorites(userId: string):Promise<Product[]> {
    const data = await this.getAll({
      where: eq(favoriteSchema.userId, userId),
      columns: {
        id: true,
        createdAt: true,
      },
      with: {
        product: {
          columns: {
            id: true,
            name: true,
            price: true,
            coverImage: true,
          },
          with: {
            collection: {
              columns: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    const products = data.map((item) => item.product);

    return products as Product[];
  }

  async removeItem(favorite:Favorite): Promise<boolean> {
    const deletedItems = await this.delete({
      filter: {
        productId:favorite.productId,
        userId:favorite.userId,
      },
    });
    return deletedItems?.length ? true : false;
  }

  async createFavorite(favorite: Favorite): Promise<Favorite> {
    const favoriteItem = {
      userId: favorite.userId,
      productId: favorite.productId,
    };
    await this.create(favoriteItem);

    return favorite;
  }
}


export const defaultFavoriteRepository= new DefaultFavoriteRepositoryImpl()