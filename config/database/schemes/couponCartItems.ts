import { relations } from "drizzle-orm";
import {
  pgTable,
  timestamp,
  varchar,
  uuid,
  numeric,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { cart, discountCode, product } from ".";

export const couponCartItems = pgTable(
  "coupon_cart_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    cartId: uuid("cart_id")
      .notNull()
      .references(() => cart.id),
    discountId: uuid("discount_code_id")
      .notNull()
      .references(() => discountCode.id),
    productId: uuid("product_id")
      .notNull()
      .references(() => product.id),
    discountCode:varchar('discount_code').notNull(),
    discountValue: numeric("discount_value", { precision: 15, scale: 6 })
      .$type<number>()
      .default(0).notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  },
  (table) => ({
    cart_discountCode: uniqueIndex().on(table.cartId, table.discountId),
  })
);

export const couponCartItemsRelations = relations(
  couponCartItems,
  ({ many, one }) => ({
    coupon: one(discountCode, {
      fields: [couponCartItems.discountId],
      references: [discountCode.id],
    }),
    product: one(product, {
      fields: [couponCartItems.productId],
      references: [product.id],
    }),
    cart: one(cart, {
      fields: [couponCartItems.cartId],
      references: [cart.id],
    }),
  })
);
