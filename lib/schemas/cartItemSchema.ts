import {z} from 'zod'

export const cartItemSchema = z.object({
    deviceId:z.string().min(1),
    colorId:z.string().optional().nullable(),
    productId:z.string().min(1),
    quantity:z.number().default(1),
    configurationId:z.string().optional().nullable(),
    isAddItemFirstTime:z.boolean().default(false)
})

export const customCaseCartDetailsSchema = z.object({
    productId: z.string().min(1,{message:'Seleccione un material'}), 
    quantity: z.number().int().default(1), 
    deviceId:z.string().min(1,{message:'Seleccione un dispositivo'}),
    price: z.string().min(1,{message:'Precio incorrecto'}), 
    discountId: z.string().uuid().nullable().optional(), 
  });
  