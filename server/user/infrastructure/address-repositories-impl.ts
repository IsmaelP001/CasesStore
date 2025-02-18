import { address, defaultAddress } from "@/config/database/schemes";
import { BaseRepository } from "@/server/shared/repositories/BaseRepository";
import {
  Address,
  AddressActive,
} from "../domain/address.model";
import {
  IActiveAddressRepository,
  IDefaultAddressRepository,
} from "../domain/repositories";

 class DefaultAddressRepositoryImpl
  extends BaseRepository<typeof address, "address">
  implements IDefaultAddressRepository
{
  constructor() {
    super(address, "address");
  }

  async createUserAddress(address: Address): Promise<Address> {
    const [newAddressData]= await this.create(address);
    return newAddressData as Address
  
  }

  async updateUserAddress(address:Address): Promise<Address> {
    const {id,...rest}=address
    const [updatedAddressData]=await this.update({
      filter: { id },
      input: rest
    });
    return updatedAddressData as Address
  }

  async getAddresses(userId: string): Promise<Address[]> {
    const addresses = await this.getAll({
      filter: { userId },
      columns: {
        id: true,
        street: true,
        city: true,
        country: true,
        zipCode: true,
        references: true,
      },
    });

    return addresses as Address[]
    
  }

  async deleteUserAddress(addressId:string,userId:string): Promise<Address> {
     const [deleteAddress]=await this.delete({
      filter: { id: addressId, userId },
    });
    return deleteAddress as Address
  }
}

class ActiveAddressRepositoryImpl
  extends BaseRepository<typeof defaultAddress, "defaultAddress">
  implements IActiveAddressRepository
{
  constructor() {
    super(defaultAddress, "defaultAddress");
  }

  async setUserDefaultAddress(addressId:string,userId:string): Promise<{addressId:string}> {
    const [data] = await this.create(
      { addressId, userId },
      {
        onConflictDoUpdate: {
          target: defaultAddress.userId,
          set: { addressId},
        },
      }
    );
    return {addressId:data.addressId!}
  }

  async getActiveUserAddress(userId:string,includeAddressDetails:boolean=true): Promise<AddressActive> {
    const queryOptions = {
      filter: { userId: userId },
      columns: {
        addressId:true
      },
      ...(includeAddressDetails && {
        with: {
          address: {
            columns: {
              id:true,
              street: true,
              city: true,
              country: true,
              zipCode: true,
              references: true,
            },
          },
        },
      }),
    };
  
    const activeAddress = await this.getFirst(queryOptions);
    return activeAddress as AddressActive

  }
}

export const defaultAddressRepository= new DefaultAddressRepositoryImpl()
export const activeAddressRepository=new ActiveAddressRepositoryImpl()