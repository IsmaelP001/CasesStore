import { MonthlyOrdersTotal, Order, OrderItems, Pagination, TotalOrderRevenue } from "../domain/models";
import { OrderDto } from "./dto";

export interface IOrderService{
     save(dto:OrderDto):Promise<void> 
     getOrders(param:Pagination):Promise<Order[]>
     getTotalOrderRevenue():Promise<TotalOrderRevenue>
     getMonthlyOrdersTotal():Promise<MonthlyOrdersTotal[]>
}