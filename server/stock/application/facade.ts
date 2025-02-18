import { InStock } from "../domain/model"
import { IStockRepository } from "../domain/repository"
import { FindStockByProductAndDeviceId } from "./dto"
import { IStockService } from "./service-def"

class DefaultStockFacadeImpl
{
  constructor(
    private stockService:IStockService
  ) {
  }

  async findStockByProductAndDeviceId(data:FindStockByProductAndDeviceId):Promise<InStock>{
    return await this.stockService.findStockByProductAndDeviceId(data)
  }

}