import { handleError } from "@/server/shared/utils/errors";
import { IOrderService } from "./services";
import { OrderDto } from "./dto";
import { defaultOrderService } from "./services.impl";
import { ICartService } from "@/server/cart/application/services";
import { defaultCartService } from "@/server/cart/application/services-default";
import {
  MonthlyOrdersTotal,
  Order,
  Pagination,
  TotalOrderRevenue,
} from "../domain/models";
import { cookies } from "next/headers";
import { VARIABLES_CONFIG } from "@/lib/utils/utils";

class OrderFacadeImpl {
  constructor(
    private orderService: IOrderService,
    private cartService: ICartService
  ) {}

  async save(orderDto: OrderDto) {
    try {
      await this.orderService.save(orderDto);
      await this.cartService.markCartAsCheckedOut(orderDto.cartId);
      cookies().delete(VARIABLES_CONFIG.CART_TOKEN!);
    } catch (error) {
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
