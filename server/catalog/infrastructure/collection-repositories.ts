import { collection, product } from "@/config/database/schemes";
import { db } from "@/config/database/db";
import { count, eq } from "drizzle-orm";
import { BaseRepository } from "@/server/shared/repositories/BaseRepository";
import { Collection, FilterCollection } from "../domain/collection.model";
import { ICollectionRepository } from "../domain/repositories";

class DefaultCollectionsRepositoryImpl extends BaseRepository<
  typeof collection,
  "collection"
>  implements ICollectionRepository{
  constructor() {
    super(collection, "collection");
  }

  async getAllCollections(filter:FilterCollection): Promise<Collection[]> {
    const itemsQuery =  db
      .select({
        id: collection.id,
        name: collection.name,
        products_count: count(product.id),
        image: collection.image,
      })
      .from(collection)
      .leftJoin(product, eq(collection.id, product.collectionId))
      .groupBy(collection.id).$dynamic()
      if(filter?.limit){
        itemsQuery.limit(filter?.limit )
      }
    return await itemsQuery as Collection[];
  }
}

export const defaultCollectionRepository =
  new DefaultCollectionsRepositoryImpl();
