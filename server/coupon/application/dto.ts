
export interface ApplyCouponToCartDto{
    code:string,
    cartId:string
}

export interface RemoveDiscountCodeDto{
    cartId:string,
    discountId:string
}

export interface getCouponInCartDto{
    cartId:string,
    includeCouponItem?:boolean
}