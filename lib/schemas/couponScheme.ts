import {z} from 'zod'

const enumValues = ["FIXED", "PORCENTAGE"] as const;

export const addCoupomScheme=z.object({
    code:z.string().min(2),
    discountAmount:z.coerce.number().int().min(1),
    discountType:z.enum(enumValues),
    allProducts:z.coerce.boolean(),
    productIds:z.array(z.number()).optional(),
    expiresAt:z.preprocess(
        value=>(value === "" ? undefined : value),
        z.coerce.date().min(new Date()).optional()
    ),
    limit:z.preprocess(
        value=>(value === "" ? undefined : value),
        z.coerce.number().int().min(1).optional()
    )
})
.refine(data => data.discountAmount <=100 || data.discountType !== enumValues[1],{
    message:'Porcentaje debe ser menor o igual a 100',
    path:['discountType']
})
.refine(data => !data.allProducts || data.productIds == null,{
    message:'No puedes seleccionar productos cuando **todos los productos esta seleccionado',
    path:['productIds']
})
// .refine(data => !data.allProducts && data.productIds.length === 0,{
//     message:'Debes seleccionar productos cuando `todos los productos` no esta seleccionado',
//     path:['productIds']
// })