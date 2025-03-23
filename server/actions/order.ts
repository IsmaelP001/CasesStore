'use server'
import { orderFacade } from "../order/application/facade";

export const createOrder = async (input: any ,userId: string) => {
    await orderFacade.save({ ...input, userId });
  };
  
  export const getOrders = async (cursor?: string, limit?: number) => {
    return await orderFacade.getOrders({ limit, cursor });
  };
  
  export const getMonthlyOrdersTotal = async () => {
    return await orderFacade.getMonthlyOrdersTotal();
  };
  
  export const getTotalOrderRevenue = async () => {
    return await orderFacade.getTotalOrderRevenue();
  };
  