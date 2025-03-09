import { BaseRepository } from "@/server/shared/repositories/BaseRepository";
import {
  MonthlyOrdersTotal,
  Order,
  OrderItems,
  Pagination,
  TotalOrderRevenue,
} from "../domain/models";

import {
  cart,
  discountCode,
  order,
  orderDetails,
  productDevices,
} from "@/config/database/schemes";
import { IOrderRepository } from "../domain/repositories";
import { and, avg, count, desc, eq, gte, sql, sum } from "drizzle-orm";

export class DefaultOrderRepositoryImpl
  extends BaseRepository<typeof order, "order">
  implements IOrderRepository
{
  constructor(private orderDetailsRepository: OrderDetailsRepository) {
    super(order, "order");
  }

  async save(order: Order, orderItems: OrderItems[]): Promise<void> {
    await this.db.transaction(async (tx: any) => {
      const newOrderPromise = this.create(order as any, { tx });

      const orderItemsPromises = this.orderDetailsRepository.create(
        orderItems,
        { tx }
      );

      const markCartAsCheckout = tx
        .update(cart)
        .set({status:'CHECKED_OUT'})
        .where(eq(cart.id, order.cartId));

      const reduceQuantityInStockPromises = orderItems.map((item) => {
        return tx
          .update(productDevices)
          .set({ inStock: sql`${productDevices.inStock} - ${item.quantity}` })
          .where(
            and(
              eq(productDevices.productId, item.productId),
              eq(productDevices.deviceId, item.deviceId)
            )
          );
      });

      const promises = [
        newOrderPromise,
        orderItemsPromises,
        markCartAsCheckout,
        ...reduceQuantityInStockPromises,
      ];

      if (order?.discountId) {
        const discountUsesPromise = tx
          .update(discountCode)
          .set({ uses: sql`${discountCode.uses} + 1` })
          .where(eq(discountCode.id, order.discountId));
        promises.push(discountUsesPromise);
      }

      await Promise.all(promises);
    });
  }

  async getOrders(param: Pagination): Promise<Order[]> {
    const data = await this.getAll({
      where: param?.cursor ? gte(order.id, param.cursor) : undefined,
      columns: {
        id: true,
        cartId: true,
        total: true,
        grossTotal: true,
        totalDiscounts: true,
        shipping: true,
        itebis: true,
        deliveryType: true,
        status: true,
        isPaid: true,
        paymentMethod: true,
        addressId: true,
        createdAt: true,
      },
      with: {
        user: {
          columns: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      limit: param.limit || 10,
      orderBy: desc(order.id),
    });

    return data as Order[];
  }

  async getTotalOrderRevenue(): Promise<TotalOrderRevenue> {
    const data = await this.db
      .select({
        totalRevenew: sum(order.total),
        totalOrders: count(order.id),
        orderAverage: avg(order.total),
      })
      .from(order);
    return data[0];
  }

  async getMonthlyOrdersTotal(): Promise<MonthlyOrdersTotal[]> {
    const data = await this.db
      .select({
        month: sql<number>`cast(EXTRACT(MONTH FROM ${order.createdAt})as int)`,
        totalPerMonth: sql<number>`cast(SUM(${order.total}) as int)`,
      })
      .from(order)
      .groupBy(sql`EXTRACT(MONTH FROM ${order.createdAt})`);

    return data;
  }
}

export class OrderDetailsRepository extends BaseRepository<
  typeof orderDetails,
  "orderDetails"
> {
  constructor() {
    super(orderDetails, "orderDetails");
  }
}

const orderDetailsRepository = new OrderDetailsRepository();
export const defaultOrderRepository = new DefaultOrderRepositoryImpl(
  orderDetailsRepository
);
