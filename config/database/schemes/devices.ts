import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  char,
  primaryKey,
  integer,
  index,
  uniqueIndex,
  timestamp,
  unique,
  varchar,
  uuid,
} from "drizzle-orm/pg-core";
import {
  cartDetails,
  configurationimage,
  orderDetails,
  product,
  productDevices,
} from ".";

export const devices = pgTable("devices", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});

export const devicesRelations = relations(devices, ({ many }) => ({
  product: many(productDevices),
  cartDetails: many(cartDetails),
  orderDetails: many(orderDetails),
}));
