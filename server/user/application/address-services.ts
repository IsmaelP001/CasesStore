import {  Address, AddressActive } from "../domain/address.model";
import {
  IActiveAddressRepository,
  IDefaultAddressRepository,
} from "../domain/repositories";
import { IAddressService } from "./services";
import {
  activeAddressRepository,
  defaultAddressRepository,
} from "../infrastructure/address-repositories-impl";
import { TRPCError } from "@trpc/server";

class AddressServiceImpl implements IAddressService {
  constructor(
    private addressRepository: IDefaultAddressRepository,
    private activeAddressRepository: IActiveAddressRepository
  ) {}

  async getAllUserAddresses(userId:string): Promise<Address[]> {
    try {
      return await this.addressRepository.getAddresses(userId);
    } catch (error) {
      console.log("error", error);
      throw new Error("Error al obtener colores");
    }
  }
 
  async getActiveUserAddress(userId: string): Promise<AddressActive> {
    try {
      return await this.activeAddressRepository.getActiveUserAddress(userId);
    } catch (error) {
      console.log("error getting default address", error);
      throw new Error("Error al obtener colores");
    }
  }


  async getActiveUserAddressId(userId:string): Promise<AddressActive> {
      const defaultAddress = await this.activeAddressRepository.getActiveUserAddress(userId,false);
      if(!defaultAddress?.addressId){
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Seleccione una direccion de envio",
        });
      }
      return defaultAddress
   
  }

  async create(address: Address): Promise<Address> {
    try {
      const newAddress = await this.addressRepository.createUserAddress(
        address
      );
      return newAddress;
    } catch (error) {
      console.log("error", error);
      throw new Error("Error creating address");
    }
  }

  async updateDefaultAddress(addressId:string,userId:string): Promise<{addressId:string}> {
    try {
      return await this.activeAddressRepository.setUserDefaultAddress(addressId,userId);
    } catch (error) {
      console.log("err", error);
      throw new Error("Error updating default address");
    }
  }

  async updateAddress(address: Address): Promise<Address> {
    try {
      return await this.addressRepository.updateUserAddress(address);
    } catch (error) {
      console.log("err", error);
      throw new Error("Error updating default address");
    }
  }

  async deleteAddress(addressId:string,userId:string): Promise<Address> {
    try {
      return await this.addressRepository.deleteUserAddress(addressId,userId);
    } catch (error) {
      throw new Error("Error updating default address");
    }
  }
}

export const defaultAddressService = new AddressServiceImpl(
  defaultAddressRepository,
  activeAddressRepository
);
