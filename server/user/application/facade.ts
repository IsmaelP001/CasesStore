import { Pagination, UpdateUser, User } from "../domain/user.model";
import {
  IAddressService,
  IAuthService,
  IFavoriteService,
  IGiftService,
  IUserService,
} from "./services";
import { Address, AddressActive } from "../domain/address.model";
import { Gift, GiftActive, updateGift } from "../domain/gift.model";
import { handleError } from "@/server/shared/utils/errors";
import { Favorite } from "../domain/favorite.model";
import { Product } from "@/server/catalog/domain/product.model";
import bcrypt from "bcrypt";
import { AuthSignin } from "../domain/auth.model";
import { comparePassword, hashPassword } from "@/lib/auth";
import { TRPCError } from "@trpc/server";

export class AuthFacade {
  constructor(private authService: IAuthService) {}

  async authUserExternalProvider(user: User): Promise<User> {
    try {
      const userDb = await this.authService.findOrCreateUser(user);
      return userDb;
    } catch (error) {
      throw new Error("Error finding or creating user" + error);
    }
  }

  async register(userData:User): Promise<User> {
   try {
    const isEmailExist = await this.authService.getUserByEmailLocalProvider(userData?.email)
    if(isEmailExist){
      throw new TRPCError({
        code:'FORBIDDEN',
        message:"Un usuario ya existe con este correo, inicia session."
      })
    }
    const hashedPassword= await hashPassword(userData.password!)
    return await this.authService.register({...userData,password:hashedPassword});
   } catch (error) {
    handleError(error)
   }
  }

  async authUserLocalDb({email,password}:AuthSignin): Promise<User> {
    try {
      const userDb = await this.authService.getUserByEmailLocalProvider(email);
      if(!userDb){
        throw new Error("email/Usuario no encontrado");
      }
      const isPasswordMatch= await comparePassword(password,userDb?.password!)
      if (!isPasswordMatch) {
        throw new Error("password/Contraseña incorrecta");
      }
      const {password:userPasword,...rest}=userDb
      return rest
    } catch (error) {
      throw error
    }
  }
}

export class UserFacade {
  constructor(private userService: IUserService) {}

  async findOrCreateUser(user: User) {
    try {
      return await this.userService.findOrCreateUser(user);
    } catch (error) {
      throw new Error("Error finding or creating user");
    }
  }

  async getTotalCustomers(): Promise<{ totalUsers: string }> {
    try {
      return this.userService.getTotalCustomers();
    } catch (error) {
      handleError(error);
    }
  }

  async findUserByEmailAuth(email: string) {
    try {
      return await this.userService.getByEmailAuth(email);
    } catch (error) {
      throw new Error("Error finding or creating user");
    }
  }

  async getUserById(userId: string): Promise<User> {
    try {
      return await this.userService.getById(userId);
    } catch (error) {
      throw new Error("error getting user by id");
    }
  }

  async authUserProvider(user: User): Promise<User> {
    try {
      const userDb = await this.userService.findOrCreateUser(user);
      return userDb;
    } catch (error) {
      throw new Error("Error finding or creating user" + error);
    }
  }

  async updateUser(user: Partial<UpdateUser>): Promise<User> {
    try {
      return await this.userService.updateUser(user);
    } catch (error) {
      throw new Error("error al obtener productos");
    }
  }

  async authUserDb(email: string): Promise<User> {
    try {
      const userDb = await this.userService.getByEmailAuth(email);
      return userDb;
    } catch (error) {
      throw new Error("Error finding  user");
    }
  }

  async getAllUsers(pagination: Pagination): Promise<User[]> {
    return this.userService.getAllUsers(pagination);
  }
}

export class AddressFacade {
  constructor(private addressService: IAddressService) {}

  async getAllAddresses(userId: string) {
    try {
      return await this.addressService.getAllUserAddresses(userId);
    } catch (error) {
      handleError(error);
    }
  }

  async getAllUserAddresses(userId: string) {
    try {
      return await this.addressService.getAllUserAddresses(userId);
    } catch (error) {
      handleError(error);
    }
  }

  async getActiveUserAddress(userId: string): Promise<AddressActive | null> {
    try {
      const data = await this.addressService.getActiveUserAddress(userId);
      if (!data) return null;
      return data;
    } catch (error) {
      handleError(error);
    }
  }

  async getActiveUserAddressId(userId: string): Promise<AddressActive> {
    try {
      const defaultAddress = await this.addressService.getActiveUserAddress(
        userId
      );
      return defaultAddress;
    } catch (error) {
      handleError(error);
    }
  }

  async create(address: Address): Promise<Address> {
    try {
      const newAddress = await this.addressService.create(address);
      return newAddress;
    } catch (error) {
      handleError(error);
    }
  }

  async updateDefaultAddress(
    addressId: string,
    userId: string
  ): Promise<{ addressId: string }> {
    try {
      return await this.addressService.updateDefaultAddress(addressId, userId);
    } catch (error) {
      handleError(error);
    }
  }

  async updateAddress(address: Address): Promise<Address> {
    try {
      return await this.addressService.updateAddress(address);
    } catch (error) {
      handleError(error);
    }
  }

  async deleteAddress(addressId: string, userId: string): Promise<Address> {
    try {
      return await this.addressService.deleteAddress(addressId, userId);
    } catch (error) {
      handleError(error);
    }
  }
}

export class GiftFacade {
  constructor(private giftService: IGiftService) {}

  async getUserGifts(userId: string): Promise<Gift[]> {
    try {
      return await this.giftService.getUserGifts(userId);
    } catch (error) {
      handleError(error);
    }
  }

  async getActiveUserGift(userId: string): Promise<GiftActive> {
    try {
      return (await this.giftService.geActiveUserGift(userId)) || null;
    } catch (error) {
      handleError(error);
    }
  }

  async createGiftAndSetDefault(gift: Gift): Promise<Gift> {
    try {
      const newGift = await this.giftService.createGiftAndSetDefault(gift);
      return newGift;
    } catch (error) {
      handleError(error);
    }
  }

  async setActivetGiftUser(
    giftId: string,
    userId: string
  ): Promise<{ giftId: string }> {
    try {
      return await this.giftService.setActivetGiftUser(giftId, userId);
    } catch (error) {
      handleError(error);
    }
  }

  async removeDefaultGift(userId: string): Promise<{ giftId: string }> {
    try {
      return await this.giftService.removeDefaultGift(userId);
    } catch (error) {
      handleError(error);
    }
  }

  async updateGiftUser(gift: updateGift): Promise<Gift> {
    try {
      return await this.giftService.updateGiftUser(gift);
    } catch (error) {
      handleError(error);
    }
  }

  async deleteGiftUser(giftId: string, userId: string): Promise<Gift> {
    try {
      return await this.giftService.deleteGiftUser(giftId, userId);
    } catch (error) {
      handleError(error);
    }
  }
}

export class FavoriteFacade {
  constructor(private favoriteService: IFavoriteService) {}

  async userFavorites(userId: string): Promise<Product[]> {
    try {
      return await this.favoriteService.userFavorites(userId);
    } catch (error) {
      handleError(error);
    }
  }

  async addItem(favorite: Favorite): Promise<Favorite> {
    try {
      return await this.favoriteService.addItem(favorite);
    } catch (error) {
      handleError(error);
    }
  }

  async removeItem(favorite: Favorite): Promise<boolean> {
    try {
      return await this.favoriteService.removeItem(favorite);
    } catch (error) {
      handleError(error);
    }
  }
}
