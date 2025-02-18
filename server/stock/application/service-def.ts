import { FindStockByProductAndDeviceId } from "../application/dto";
import { InStock } from "../domain/model";

export interface IStockService{
    findStockByProductAndDeviceId({deviceId,productId}:FindStockByProductAndDeviceId):Promise<InStock>
}