

export interface Gift {
  id?:string
  senderName: string;
  message: string;
  firstName: string;
  lastName: string;
  phonenumber: string;
  userId:string
}

export interface updateGift extends Gift {
  id: string;
}

export interface GiftActive{
  giftId:string,
  gift?:Gift
}