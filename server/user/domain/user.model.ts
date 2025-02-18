
export interface Pagination{
  limit?:number
}

export interface User {
  id?:string
  provider:string
  firstName: string;
  lastName: string;
  phonenumber?: string;
  email: string;
  password?:string
  createdAt?:Date,
  updatedAt?:Date
  rolId?:string
}

export interface UpdateUser extends Omit<User,'id' | 'provider' | 'rolId'>{
  userId:string
}





