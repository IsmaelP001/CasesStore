export * from './user'
export * from './address'
export * from './cart'
export * from './cartDetails'
export * from './collection'
export * from './color'
export * from './favorite'
export * from './order'
export * from './orderDetails'
export * from './product'
export * from './rol'
export * from './defaultAddress'
export * from './gift'
export * from './defaultGift'
export * from './discountCode'
export * from './productDiscount'
export * from './configurationimage'
export * from './printPattern'
export * from './material'
export * from './productImages'
export * from './devices'
export * from './productDevices'
export * from './couponCartItems'

// tables.ts
export const tableNames = [
    'user',
    'address',
    'cart',
    'cartDetails',
    'collection',
    'color',
    'favorite',
    'order',
    'orderDetails',
    'product',
    'rol',
    'defaultAddress',
    'gift',
    'defaultGift',
    'discountCode',
    'productDiscount',
    'configurationimage',
    'printPattern',
    'material',
    'productImages',
    'devices',
    'productDevices'
] as const;

// Define un tipo que representa los nombres de las tablas
export type TableNames = typeof tableNames[number]; 