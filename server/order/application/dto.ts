export interface OrderDto {
    deliveryType: string;
    scheduledDate?: Date;
    paymentMethod: string;
    userId:string,
    discountId?:string
  }