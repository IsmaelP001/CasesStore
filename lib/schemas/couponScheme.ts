import { z } from 'zod';

const enumValues = ["FIXED", "PORCENTAGE"] as const;

const stringToBoolean = (value) => {
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true';
  }
  return Boolean(value);
};

export const addCoupomScheme = z.object({
  code: z.string().min(2,{message:'Coupon debe de tener almenos 2 caracteres'}),
  discountAmount: z.coerce.number().int().min(1,{message:'Cantidad de descuento es requerido'}),
  discountType: z.enum(enumValues),
  allProducts: z.preprocess(stringToBoolean, z.boolean()),
  productIds: z.array(z.number()).optional(),
  expiresAt: z.preprocess(
    value => value === "" ? undefined : value,
    z.date().refine(
      value => value !== undefined, {
        message: 'La fecha de expiración es requerida',
        path: ['expiresAt']
      }
    )
  ),
  limit: z.preprocess(
    value => (value === "" ? undefined : value),
    z.coerce.number().int().min(1).optional()
  )
})
.refine(data => data.discountAmount <= 100 || data.discountType !== enumValues[1], {
  message: 'Porcentaje debe ser menor o igual a 100',
  path: ['discountType']
})
.refine(data => {
  return data.allProducts || data.productIds.length > 0
}, {
  message: 'Debes de seleccionar almenos 1 producto',
  path: ['productIds']
});
