'use server'

import { signOut } from "next-auth/react"

signOut
export async function signoutHandler(){
    await signOut()
}