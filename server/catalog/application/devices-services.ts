import { Devices } from "../domain/devices.model";
import { IDevicesRepository, IMaterialRepository } from "../domain/repositories";
import { defaultDeviceRepository } from "../infrastructure/devices-repositories";
import { IDeviceService } from "./service.definitions";

 class DefaultDevicesServiceImpl implements IDeviceService {
  constructor(private devicesRepository: IDevicesRepository) {}

  async getAllDevices(): Promise<Devices[]> {
    try {
      return await this.devicesRepository.getAllDevices();
    } catch (error) {
      throw new Error("Error al obtener colores");
    }
  }
}

export const defaultDeviceService= new DefaultDevicesServiceImpl(defaultDeviceRepository)