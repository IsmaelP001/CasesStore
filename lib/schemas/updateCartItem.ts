import { z } from "zod";

export const updateCartItem=z.object({
    quantity:z.number(),
    productId:z.string(),
    cartId:z.string()
})

export type UpdateCartItem=z.infer<typeof updateCartItem> & {
    cartId:string
}