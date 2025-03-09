import { z } from "zod";

export const productFilterSchema = z.object({
  device: z
    .string()
    .transform((data) => (data ? data.split("%") : []))
    .optional(),
  collection: z
    .string()
    .transform((data) => (data ? data.split("%") : []))
    .optional(),
  pattern: z
    .string()
    .transform((data) => (data ? data.split("%") : []))
    .optional(),
  color: z
    .string()
    .transform((data) => (data ? data.split("%") : []))
    .optional(),
  material: z
    .string()
    .transform((data) => (data ? data.split("%") : []))
    .optional(),
  page:z.coerce.number().optional(),
  pageSize:z.coerce.number().optional()
}).optional()
