

export interface Address {
  id?:string
  street: string;
  city: string;
  country: string;
  zipCode: string;
  userId?:string
  references?: string;
  createdAt?:Date,
  updatedAt?:Date
}

export interface AddressActive {
  addressId: string;
  address?:Address
}

