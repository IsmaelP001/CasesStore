export interface AuthSignin{
    email:string,
    password:string
}

export const userRoles = ['admin','user']as const

export type UserRoles = (typeof userRoles)[number];
