import { Gift, GiftActive, updateGift } from "../domain/gift.model";
import { activeGiftRepository, defaultGiftRepository } from "../infrastructure/gift-repositories-impl";
import { IDefaultGiftRepository, IGiftRepository } from "../domain/repositories";
import { IGiftService } from "./services";

 class GiftServiceImpl implements IGiftService {
  

  constructor(
    private giftRepository: IGiftRepository,
    private defaultGiftRepository: IDefaultGiftRepository) {
    
  }

  async getUserGifts(userId: string):Promise<Gift[]> {
    try {
      return await this.giftRepository.getUserGifts(userId);
    } catch (error) {
      throw new Error("Error al obtener colores");
    }
  }

  async geActiveUserGift(userId: string):Promise<GiftActive> {
    try {
      return await this.defaultGiftRepository.getDefaulGift(userId);
    } catch (error) {
      console.log("error", error);
      throw new Error("Error al obtener colores");
    }
  }

  async createGiftAndSetDefault(gift: Gift):Promise<Gift> {
    try {
      const newGift = await this.giftRepository.createGift(gift);
      await this.defaultGiftRepository.setActiveGiftUser(newGift.id!,gift.userId);
      return newGift;
    } catch (error) {
      console.log("error", error);
      throw new Error("Error creating address");
    }
  }

  async setActivetGiftUser(giftId:string,userId:string):Promise<{giftId:string}> {
      return await this.defaultGiftRepository.setActiveGiftUser(giftId,userId);
  }

  async removeDefaultGift(userId:string):Promise<{giftId:string}> {
    try {
      return await this.defaultGiftRepository.removeDefaultGift(userId);
    } catch (error) {
      console.log("error", error);
      throw new Error("Error creating address");
    }
  }

  async updateGiftUser(gift: updateGift):Promise<Gift> {
    try {
      return await this.giftRepository.updateGift(gift);
    } catch (error) {
      console.log("error", error);
      throw new Error("Error creating address");
    }
  }

  async deleteGiftUser(giftId:string,userId:string):Promise<Gift> {
    try {
      return await this.giftRepository.deleteGift(giftId,userId);
    } catch (error) {
      throw new Error("Error updating default address");
    }
  }
}


export const defaultGiftService= new GiftServiceImpl(defaultGiftRepository,activeGiftRepository)