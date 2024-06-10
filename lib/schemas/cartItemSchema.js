import {z} from 'zod'

export const cartItemSchema = z.object({
    deviceId:z.coerce.number().int().min(1),
    colorId:z.coerce.number().int().min(1),
    productId:z.coerce.number().int().min(1)
})