'use server'
import { giftServiceFacade } from "../user/application";


export const getUserGift = async (userId: string) => {
  return await giftServiceFacade.getUserGifts(userId);
};

export const getDefaultGift = async (userId: string) => {
  return await giftServiceFacade.getActiveUserGift(userId);
};

export const createGift = async (input: any, userId: string) => {
  return await giftServiceFacade.createGiftAndSetDefault({ ...input, userId });
};

export const updateDefaultGift = async (input: any, userId: string) => {
  return await giftServiceFacade.setActivetGiftUser(input.giftId, userId);
};

export const removeDefaultGift = async (userId: string) => {
  return await giftServiceFacade.removeDefaultGift(userId);
};

export const updateGift = async (input: any & { id: string }, userId: string) => {
  return await giftServiceFacade.updateGiftUser({ ...input, userId });
};

export const deleteGift = async (input: any, userId: string) => {
  return await giftServiceFacade.deleteGiftUser(input.giftId, userId);
};