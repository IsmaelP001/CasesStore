import { Address, AddressActive } from "../domain/address.model";
import { Gift, GiftActive, updateGift } from "../domain/gift.model";
import { Pagination, UpdateUser, User } from "../domain/user.model";
import { Favorite } from "../domain/favorite.model";
import { Product } from "@/server/catalog/domain/product.model";

export interface IAddressService {
  getAllUserAddresses(userId: string): Promise<Address[]>;
  getActiveUserAddress(userId: string): Promise<AddressActive>;
  getActiveUserAddressId(userId: string): Promise<AddressActive>;
  create(address: Address): Promise<Address>;
  updateDefaultAddress(addressId:string,userId:string): Promise<{addressId:string}>;
  updateAddress(address: Address): Promise<Address>;
  deleteAddress(addressId:string,userId:string): Promise<Address>;
}


export interface IGiftService {
  getUserGifts(userId: string): Promise<Gift[]>;
  geActiveUserGift(userId: string): Promise<GiftActive>;
  createGiftAndSetDefault(gift: Gift): Promise<Gift>;
  setActivetGiftUser(giftId: string, userId: string): Promise<{ giftId: string }>;
  removeDefaultGift(userId: string): Promise<{ giftId: string }>;
  updateGiftUser(gift: updateGift): Promise<Gift>;
  deleteGiftUser(giftId: string, userId: string): Promise<Gift>;
}

export interface IUserService {
    updateUser(user:Partial<UpdateUser>): Promise<User>;
    getById(userId: string): Promise<User>;
    findOrCreateUser(user:User):Promise<User>
    getByEmailAuth(email: string):Promise<User>
    getTotalCustomers():Promise<{totalUsers:string}>
    getAllUsers(pagination: Pagination): Promise<User[]>
}

export interface IAuthService {
  findOrCreateUser(user:User):Promise<User>
  getByEmailAuth(email: string):Promise<User>
  register(userData:User): Promise<User>
  getUserByEmailLocalProvider(email:string): Promise<User>
}



export interface IFavoriteService {
    userFavorites(userId:string): Promise<Product[]>;
    addItem(favorite: Favorite): Promise<Favorite>;
    removeItem(favorite: Favorite): Promise<boolean>;

}

