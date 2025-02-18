export interface OrderDto {
    deliveryType: string;
    scheduledDate?: Date;
    paymentMethod: string;
    userId:string,
    cartId:string
    discountId?:string
  }