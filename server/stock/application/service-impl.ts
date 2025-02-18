import { InStock } from "../domain/model"
import { IStockRepository } from "../domain/repository"
import { defaultStockRepository } from "../infrastructure/repository-impl"
import { FindStockByProductAndDeviceId } from "./dto"
import { IStockService } from "./service-def"

class DefaultStockServiceImpl implements IStockService
{
  constructor(
    private stockRepository:IStockRepository
  ) {
  }

  async findStockByProductAndDeviceId(data:FindStockByProductAndDeviceId):Promise<InStock>{
    return await this.stockRepository.findStockByProductAndDeviceId(data)
  }

}

export const defaultStockService=new DefaultStockServiceImpl(defaultStockRepository)