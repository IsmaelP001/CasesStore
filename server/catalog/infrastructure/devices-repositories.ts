
import { devices } from "@/config/database/schemes";
import { BaseRepository } from "@/server/shared/repositories/BaseRepository";
import { Devices } from "../domain/devices.model";
import { IDevicesRepository } from "../domain/repositories";

export class DefaultDevicesRepositoryImpl extends BaseRepository<typeof devices,"devices"> implements IDevicesRepository{
    constructor(){
        super(devices,"devices")
    }

    async getAllDevices():Promise<Devices[]>{
        return this.getAll({
            columns:{
                id:true,
                name:true
            }
        })
    }


}

export const defaultDeviceRepository= new DefaultDevicesRepositoryImpl()