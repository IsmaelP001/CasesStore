import { z } from "zod";

export const singUpSchema = z
  .object({
    firstName: z.string().nonempty("El nombre es obligatorio"),
    lastName: z.string().nonempty("El apellido es obligatorio"),
    email: z.string().email("Debe ser un correo válido"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], // Campo que mostrará el error
    message: "Las contraseñas no coinciden",
  });