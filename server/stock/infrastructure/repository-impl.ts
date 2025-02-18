
import { BaseRepository } from "@/server/shared/repositories/BaseRepository";

import { productDevices } from "@/config/database/schemes";
import { InStock } from "../domain/model";
import { FindStockByProductAndDeviceId } from "../application/dto";
import { IStockRepository } from "../domain/repository";


class DefaultStockRepositoryImpl
  extends BaseRepository<typeof productDevices, 'productDevices'> 
  implements IStockRepository
{
  constructor() {
    super(productDevices, 'productDevices');
  }

  async findStockByProductAndDeviceId({deviceId,productId}:FindStockByProductAndDeviceId):Promise<InStock>{
    return await this.getFirst({filter:{productId,deviceId}})
  }



}

export const defaultStockRepository = new DefaultStockRepositoryImpl();
