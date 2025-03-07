export interface CartItemDto{
    id?: number;
    userId?:string,
    productId: string;
    deviceId: string;
    quantity: number;
    colorId?: string | null;
    configurationId?: string | null;
  }

  export interface CustomCaseCartDetailsDto {
    id?: number; 
    material: string;
    quantity: number;
    deviceId:string
    price: string; 
    discountId?: string | null; 
    configurationId: string; 
    userId:string
  }
  export interface ApplyDiscountDto{
    userId: string, code: string
  }