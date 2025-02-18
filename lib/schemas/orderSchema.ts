import { paymentTypeOrderEnum } from "@/config/database/schemes";
import { z } from "zod";

export const orderSchema = z
  .object({
    paymentMethod: paymentTypeOrderEnum,
    deliveryType: z.enum(["standard", "scheduled"], {
      message: "Tipo de entrega no válido",
    }),
    cartId:z.string().length(36,{message:'Cart id no valido'}),
    deliveryHour: z.string().optional(),
    discountId:z.string().optional(),
    scheduledDate: z
      .string()
      .nullable()
      .transform((date) => (date === null ? undefined : new Date(date)))
      .optional(),
  })
  // .refine(
  //   (data) => {
  //     // Check if deliveryType is "scheduled" and validate scheduledDate and deliveryHour accordingly
  //     if (data.deliveryType === "scheduled") {
  //       return !!data.deliveryHour && !!data.scheduledDate;
  //     }
  //     return true;
  //   },
  //   {
  //     message: "Escoja una fecha y hora de entrega",
  //     path: ["scheduledDate", "deliveryHour"],
  //   }
  // );
