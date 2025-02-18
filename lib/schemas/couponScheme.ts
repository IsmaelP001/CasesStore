import { z } from "zod";

const enumValues = ["FIXED", "PORCENTAGE"] as const;

const stringToBoolean = (value: any) => {
  if (typeof value === "string") {
    return value.toLowerCase() === "true";
  }
  return Boolean(value);
};

export const couponScheme = z
  .object({
    code: z
      .string()
      .min(2, { message: "Coupon debe de tener almenos 2 caracteres" }),
    discountAmount: z.coerce
      .number()
      .int()
      .min(1, { message: "Cantidad de descuento es requerido" }),
    discountType: z.enum(enumValues),
    allProducts: z.boolean({
      message: "Tipo de productos permitidos invalido",
    }),
    productIds: z.array(z.string()).optional(),
    expiresAt: z
      .date()
      .refine(
        (value) => {
          const todayAtMidnight = new Date();
          todayAtMidnight.setHours(0, 0, 0, 0)
          // Solo valida si `expiresAt` existe y compara con la fecha actual
          return !value || value >= todayAtMidnight;
        },
        {
          message:
            "La fecha de expiración debe ser mayor a la fecha actual",
        }
      )
      .optional(),
    limit: z.preprocess(
      (value) => (value === "" ? undefined : value),
      z.coerce.number().int().min(1).optional()
    ),
  })
  .refine(
    (data) => data.discountAmount <= 100 || data.discountType !== enumValues[1],
    {
      message: "Porcentaje debe ser menor o igual a 100",
      path: ["discountType"],
    }
  )
  .refine(
    (data) => {
      return data.allProducts || data?.productIds?.length;
    },
    {
      message: "Debes de seleccionar almenos 1 producto",
      path: ["allProducts"],
    }
  )
  .refine(
    (data) => {
      return !data.allProducts || (data.productIds?.length || 0) === 0;
    },
    {
      message: "No debes seleccionar productos específicos coupon es valido para todos los productos",
      path: ["productIds"],
    }
  );
