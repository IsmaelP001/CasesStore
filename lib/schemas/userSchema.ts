import { z } from "zod";
import { cleanPhoneNumber } from "../utils/utils";

export const userSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Su nombre debe tener al menos 2 caracteres" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Este campo solo puede contener letras",
    }),

  lastName: z
    .string()
    .min(2, { message: "Su apellido debe tener al menos 2 caracteres" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Este campo solo puede contener letras",
    }),

  phonenumber: z
    .string()
    .transform((value) => cleanPhoneNumber(value))
    .refine((cleanedValue) => cleanedValue.length === 10, {
      message: "El número de teléfono debe tener exactamente 10 dígitos.",
    }),
  email: z.string().email({ message: "Email invalido" }),
});

export type UserSchema = z.infer<typeof userSchema>;
