import { defaultGift, gift } from "@/config/database/schemes";
import { BaseRepository } from "@/server/shared/repositories/BaseRepository";
import { Gift, GiftActive, updateGift } from "../domain/gift.model";
import {
  IDefaultGiftRepository,
  IGiftRepository,
} from "../domain/repositories";

class GiftRepositoryImpl
  extends BaseRepository<typeof gift, "gift">
  implements IGiftRepository
{
  constructor() {
    super(gift, "gift");
  }

  async getUserGifts(userId: string): Promise<Gift[]> {
    const giftUserItems = await this.getAll({
      filter: { userId },
      columns: {
        id:true,
        senderName: true,
        firstName: true,
        lastName: true,
        phonenumber: true,
        message: true,
      },
    });
    return giftUserItems as Gift[];
  }

  async createGift(gift: Gift): Promise<Gift> {
    const [newGiftData] = await this.create(gift);
    return newGiftData as Gift;
  }

  async updateGift(gift: updateGift): Promise<Gift> {
    const { id, ...giftData } = gift;

    const [updatedGift] = await this.update({
      filter: { id },
      input: giftData,
    });

    return updatedGift as Gift;
  }

  async deleteGift(giftId: string, userId: string): Promise<Gift> {
    const [deletedGift] = await this.delete({
      filter: { id: giftId, userId },
    });
    return deletedGift as Gift;
  }
}

class DefaultGiftRepositoryImpl
  extends BaseRepository<typeof defaultGift, "defaultGift">
  implements IDefaultGiftRepository
{
  constructor() {
    super(defaultGift, "defaultGift");
  }

  async getDefaulGift(userId: string): Promise<GiftActive> {
    const data = await this.getFirst({
      filter: { userId },
      columns: {
        giftId: true,
      },
      with: {
        gift: {
          columns: {
            id:true,
            senderName: true,
            firstName: true,
            lastName: true,
            phonenumber: true,
          },
        },
      },
    });

    return data as GiftActive;
  }

  async setActiveGiftUser(
    giftId: string,
    userId: string
  ): Promise<{ giftId: string }> {
    const [data] = await this.create(
      { userId, giftId },
      {
        onConflictDoUpdate: {
          target: defaultGift.userId,
          set: { giftId },
        },
      }
    );

    return { giftId: data.giftId! };
  }

  async removeDefaultGift(userId: string): Promise<{ giftId: string }> {
    const [data] = await this.update({
      filter: { userId },
      input: { giftId: null },
    });
    return { giftId: data.giftId! };
  }
}

export const defaultGiftRepository = new GiftRepositoryImpl();
export const activeGiftRepository = new DefaultGiftRepositoryImpl();
