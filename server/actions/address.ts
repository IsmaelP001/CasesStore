'use server'
import { addressServiceFacade } from "../user/application";

export const getUserAddresses = async (userId: string) => {
  return await addressServiceFacade.getAllAddresses(userId);
};

export const getDefaultAddress = async (userId: string) => {
  return await addressServiceFacade.getActiveUserAddress(userId);
};

export const createAddress = async (userId: string, input: any) => {
  return await addressServiceFacade.create({ ...input, userId });
};

export const updateDefaultAddress = async (
  userId: string,
  addressId: string
) => {
  return await addressServiceFacade.updateDefaultAddress(addressId, userId);
};

export const updateAddress = async (userId: string, input: any) => {
  return await addressServiceFacade.updateAddress({ ...input, userId });
};

export const deleteAddress = async (userId: string, addressId: any) => {
  return await addressServiceFacade.deleteAddress(addressId, userId);
};
