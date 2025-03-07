import { defaultAddressService } from "./address-services";
import { AddressFacade,GiftFacade,UserFacade,FavoriteFacade, AuthFacade } from "./facade";
import { defaultFavoriteService } from "./favorites-services";
import { defaultGiftService } from "./gift-services";
import { defaultUserService } from "./user-services";
import { defaultAuthService } from "./auth-services";
import { defaultCartFacade } from "@/server/cart/application/facade";



export const addressServiceFacade = new AddressFacade(defaultAddressService)
export const giftServiceFacade = new GiftFacade(defaultGiftService)
export const userServiceFacade = new UserFacade(defaultUserService)
export const favoriteServiceFacade = new FavoriteFacade(defaultFavoriteService)
export const authServiceFacade=new AuthFacade(defaultAuthService,defaultCartFacade)