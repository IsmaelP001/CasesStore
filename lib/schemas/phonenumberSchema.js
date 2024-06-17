import {z} from 'zod'


export const phonenumberSchema = z.string()
    .length(10, { message: "El número de teléfono debe tener exactamente 10 dígitos.",path:'number' })
    .refine(val => /^\d+$/.test(val), { message: "El número de teléfono solo debe contener dígitos.",path:'number2' });
