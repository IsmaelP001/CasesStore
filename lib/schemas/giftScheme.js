import {string, z} from 'zod'

export const giftScheme = z.object({
    senderName: z.string()
      .min(2, { message: 'Su nombre debe tener al menos 2 letras' })
      .regex(/^[a-zA-Z\s]+$/, { message: 'Este campo solo puede contener letras' }),

    message: z.string(),
  
    firstName: z.string()
      .min(2, { message: 'Su nombre debe tener al menos 2 caracteres' })
      .regex(/^[a-zA-Z\s]+$/, { message: 'Este campo solo puede contener letras' }),

    lastName: z.string()
    .min(2, { message: 'Su apellido debe tener al menos 2 caracteres' })
      .regex(/^[a-zA-Z\s]+$/, { message: 'Este campo solo puede contener letras' }),

    phonenumber:z.string()
    .length(10, { message: "El número de teléfono debe tener exactamente 10 dígitos." })
  });
  