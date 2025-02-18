import { Pagination, UpdateUser, User } from "../domain/user.model";
import { Favorite } from "../domain/favorite.model";

import { Gift, GiftActive, updateGift } from "./gift.model";

import { Address, AddressActive } from "./address.model";
import { Product } from "@/server/catalog/domain/product.model";

export interface IDefaultAddressRepository {
  createUserAddress(address: Address): Promise<Address>;
  updateUserAddress(address: Address): Promise<Address>;
  getAddresses(userId: string): Promise<Address[]>;
  deleteUserAddress(addressId: string, userId: string): Promise<Address>;
}

export interface IActiveAddressRepository {
  setUserDefaultAddress(
    addressId: string,
    userId: string
  ): Promise<{ addressId: string }>;
  getActiveUserAddress(
    userId: string,
    includeAddressDetails?: boolean
  ): Promise<AddressActive>;
}

export interface IGiftRepository {
  getUserGifts(userId: string): Promise<Gift[]>;
  createGift(gift: Gift): Promise<Gift>;
  updateGift(gift: updateGift): Promise<Gift>;
  deleteGift(userId: string, giftId: string): Promise<Gift>;
}

export interface IDefaultGiftRepository {
  getDefaulGift(userId: string): Promise<GiftActive>;
  setActiveGiftUser(
    giftId: string,
    userId: string
  ): Promise<{ giftId: string }>;
  removeDefaultGift(userId: string): Promise<{ giftId: string }>;
}

export interface IDefaultUserRepository {
  getUserBy(filter: Partial<User>): Promise<User>;
  updateUser(user: Partial<UpdateUser>): Promise<User>;
  createUser(user: User): Promise<User>;
  getTotalCustomers():Promise<{totalUsers:string}>
  getAllUsers(pagination: Pagination): Promise<User[]>
}


export interface IDefaultFavoriteRepository {
  isProductFavoriteExist(favorite:Favorite): Promise<boolean>;
  userFavorites(userId: string): Promise<Product[]>;

  removeItem(favorite:Favorite): Promise<boolean>;
  createFavorite(favorite: Favorite): Promise<Favorite>;
}
