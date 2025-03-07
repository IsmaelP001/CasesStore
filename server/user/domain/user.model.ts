import { UserRoles } from "./auth.model";

export interface Pagination{
  limit?:number
}

export type Provider = 'local' | 'google' |'facebook'

export interface User {
  id?:string
  provider:Provider
  firstName: string;
  lastName: string;
  phonenumber?: string;
  email: string;
  password?:string
  createdAt?:Date,
  updatedAt?:Date
  rol?:UserRoles
}


export interface UpdateUser extends Omit<User,'id' | 'provider' | 'rolId'>{
  userId:string
}





