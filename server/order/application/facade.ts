import { handleError } from "@/server/shared/utils/errors";
import { IOrderService } from "./services";
import { OrderDto } from "./dto";
import { defaultOrderService } from "./services.impl";
import { ICartService } from "@/server/cart/application/services";
import {
  MonthlyOrdersTotal,
  Order,
  Pagination,
  TotalOrderRevenue,
} from "../domain/models";
import { cookies } from "next/headers";
import { VARIABLES_CONFIG } from "@/lib/utils/utils";
import { defaultCartService } from "@/server/cart/application/services-default";

class OrderFacadeImpl {
  constructor(
    private orderService: IOrderService,
    private cartServive: ICartService
  ) {}

  async save(orderDto: OrderDto) {
    try {
      const cartId = await this.cartServive.findActiveCart(orderDto.userId)
      await this.orderService.save(orderDto,cartId.id);
      await this.cartServive.markCartAs(cartId.id,'CHECKED_OUT')
      cookies().delete(VARIABLES_CONFIG.CART_TOKEN!);
    } catch (error) {
      console.log('error saving order' + error)
      handleError(error);
    }
  }
  async getOrders(params: Pagination): Promise<Order[]> {
    try {
      return await this.orderService.getOrders(params);
    } catch (error) {
      handleError(error);
    }
  }

  async getTotalOrderRevenue(): Promise<TotalOrderRevenue> {
    try {
      return this.orderService.getTotalOrderRevenue();
    } catch (error) {
      handleError(error);
    }
  }
  async getMonthlyOrdersTotal(): Promise<MonthlyOrdersTotal[]> {
    try {
      return this.orderService.getMonthlyOrdersTotal();
    } catch (error) {
      handleError(error);
    }
  }
}

export const orderFacade = new OrderFacadeImpl(
  defaultOrderService,
  defaultCartService
);
