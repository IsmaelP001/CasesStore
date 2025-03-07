import {string, z} from 'zod'

export const addressScheme = z.object({
    street: z.string()
      .min(2, { message: 'La calle debe tener al menos 2 letras' }),
  
    city: z.string()
      .min(2, { message: 'La ciudad debe tener al menos 2 letras'})
      .regex(/^[a-zA-Z\s]+$/, { message: 'La ciudad solo puede contener letras' }),
  
      country: z.string()
      .min(2, { message: 'El país debe tener al menos 2 caracteres' })
      .regex(/^[\p{L}\s]+$/u, { message: 'Este campo solo puede contener letras y espacios' }),
    
    zipCode: z.string()
      .length(5, { message: 'El código postal debe tener exactamente 5 dígitos' }),
  
    references: z.string().optional()
  });
  
  export type AddressSchema=z.infer<typeof addressScheme>

  export type UpdateAddress=z.infer<typeof addressScheme> & {
    addressId:string,
    userId:string
  }
  export type  InsertAddress=z.infer<typeof addressScheme> & {
    userId:string
  }