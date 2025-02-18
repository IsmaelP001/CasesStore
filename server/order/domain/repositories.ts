import { MonthlyOrdersTotal, Order, OrderItems, Pagination, TotalOrderRevenue } from "../domain/models";

export interface IOrderRepository{
     save(order: Order, orderItems: OrderItems[]):Promise<void> 
     getOrders(param:Pagination):Promise<Order[]>
     getTotalOrderRevenue():Promise<TotalOrderRevenue>
     getMonthlyOrdersTotal():Promise<MonthlyOrdersTotal[]>
}