import { FindStockByProductAndDeviceId } from "../application/dto";
import { InStock } from "./model";

export interface IStockRepository{
    findStockByProductAndDeviceId({deviceId,productId}:FindStockByProductAndDeviceId):Promise<InStock>
}