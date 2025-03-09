import { ICartService } from "@/server/cart/application/services";
import { IAddressService } from "@/server/user/application/services";
import {
  MonthlyOrdersTotal,
  Order,
  OrderItems,
  Pagination,
  TotalOrderRevenue,
} from "../domain/models";
import { OrderDto } from "./dto";
import { v4 as uuidv4 } from "uuid";
import { IOrderRepository } from "../domain/repositories";
import { defaultOrderRepository } from "../infrastructure/repositories-impl";
import { defaultAddressService } from "@/server/user/application/address-services";
import { defaultCartService } from "@/server/cart/application/services-default";
import { ICouponService } from "@/server/coupon/application/services";
import { defaultDiscountService } from "@/server/coupon/application/services-impl";

class OrderServiceImpl {
  constructor(
    private orderRepository: IOrderRepository,
    private defaultAddressService: IAddressService,
    private defaultCartService: ICartService,
    private discountCodeService: ICouponService
  ) {}

  async save(dto: OrderDto) {
    const [defaultUserAddress, cartItems, couponDiscountInCart] =
      await Promise.all([
        this.defaultAddressService.getActiveUserAddressId(dto.userId),
        this.defaultCartService.getInCartItems(dto.cartId!),
        this.discountCodeService.getCouponsInCart({
          cartId: dto.cartId,
          includeCouponItem: true,
        }),
      ]);

    if (couponDiscountInCart?.coupon) {
      couponDiscountInCart.coupon.validateCouponExpiry();
      couponDiscountInCart.coupon.validateCouponLimits();
    }

    const grossTotal =
      cartItems?.items.reduce(
        (acc, { price, quantity }) => acc + parseFloat(price) * quantity,
        0
      ) || 0;

    const itebis = grossTotal * 0.18 || 0;
    const shipping = 0;
    const total =
      grossTotal +
      itebis +
      shipping -
      (couponDiscountInCart?.discountValue || 0);

    const orderId = uuidv4();
    const order: Order = {
      id: orderId,
      itebis,
      grossTotal,
      total,
      shipping,
      totalDiscounts: couponDiscountInCart?.discountValue || 0,
      discountId: couponDiscountInCart?.discountId,
      addressId: defaultUserAddress.addressId!,
      ...dto,
    };

    const orderItems: OrderItems[] = cartItems.items.map((item) => ({
      orderId,
      productId: item.productId,
      quantity: item.quantity,
      deviceId: item.device.id,
      colorId: item.colorId,
      configurationId: item?.configurationId,
    }));

    return this.orderRepository.save(order, orderItems);
  }

  async getOrders(params: Pagination): Promise<Order[]> {
    return this.orderRepository.getOrders(params);
  }

  async getTotalOrderRevenue(): Promise<TotalOrderRevenue> {
    return this.orderRepository.getTotalOrderRevenue();
  }
  async getMonthlyOrdersTotal(): Promise<MonthlyOrdersTotal[]> {
    return this.orderRepository.getMonthlyOrdersTotal();
  }
}

export const defaultOrderService = new OrderServiceImpl(
  defaultOrderRepository,
  defaultAddressService,
  defaultCartService,
  defaultDiscountService
);
