export interface Order {
  id: string;
  cartId: string;
  total: number;
  grossTotal: number;
  itebis: number;
  totalDiscounts: number;
  shipping: number;
  status?: string;
  isPaid?: boolean;
  deliveryType: string;
  scheduledDate?: Date;
  paymentMethod: string;
  addressId:string,
  discountId:string,
  user?:{
    id:string,
    firstName:string,
    lastName:string
  },
  createdAt?:Date
}


export interface Pagination{
  cursor?:string
  limit?:number
}


export interface OrderItems {
  productId: string;
  configurationId?:string
  deviceId: string;
  quantity: number;
  colorId?: string;
  orderId: string;
}


export interface TotalOrderRevenue{
  totalRevenew:number
  totalOrders:number
  orderAverage:number
}

export interface MonthlyOrdersTotal{
  month:number,
  totalPerMonth:number
}