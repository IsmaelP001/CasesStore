import {
  pgTable,
  real,
  serial,
  char,
  primaryKey,
  integer,
  index,
  boolean,
  json,
  uniqueIndex,
  timestamp,
  unique,
  text,
  varchar,
  pgEnum,
  uuid,
  PgBoolean,
} from "drizzle-orm/pg-core";
import { user, orderDetails, discountCode, address, cart } from ".";
import { InferSelectModel, relations, sql } from "drizzle-orm";
import { z } from "zod";

export const statusOrder = pgEnum("status", [
  "pendiente",
  "pagado",
  "enviado",
  "entregado",
  "cancelado",
  "reembolsado",
  "retornado",
]);
export const deliveryType = pgEnum("deliveryType", ["standard", "scheduled"]);
export const paymentMethod = pgEnum("paymentMethod", ["card", "atDelivery"]);

export const paymentTypeOrderEnum = z.enum(paymentMethod.enumValues, {
  message: "Metodo de pago no valido",
});

export const order = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  cartId: uuid("cartId")
    .notNull()
    .references(() => cart.id),
  total: real("total").default(0),
  grossTotal: real("grossTotal").default(0),
  itebis: real("itebis").default(0),
  discountCodeId:uuid('discount_id').references(()=>discountCode.id,{onDelete:'restrict'}),
  totalDiscounts: real("totalDiscounts").default(0),
  shipping: real("shipping").default(0),
  status: statusOrder("status").default("pendiente").notNull(),
  isPaid: boolean("isPaid").notNull().default(false),
  deliveryType: deliveryType("deliveryType").default("standard").notNull(),
  scheduledDate: timestamp("scheduledDate", { mode: "date" }),
  paymentMethod: paymentMethod("paymentMethod").notNull(),
  userId: uuid("userId").references(() => user.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  addressId: uuid("addressId")
    .references(() => address.id, { onDelete: "set null", onUpdate: "cascade" })
    .notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`(current_timestamp)`),
});

export const orderRelations = relations(order, ({ many, one }) => ({
  orderDetails: many(orderDetails),
  user: one(user, {
    fields: [order.userId],
    references: [user.id],
  }),
  addressId: one(address, {
    fields: [order.addressId],
    references: [address.id],
  }),
  cartId: one(cart, {
    fields: [order.cartId],
    references: [cart.id],
  }),
}));

export type InsertOrder = InferSelectModel<typeof order>;
