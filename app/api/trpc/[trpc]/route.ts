import {fetchRequestHandler} from "@trpc/server/adapters/fetch"

import {appRouter} from '@/server'
import { createContext} from "@/server/context"
import { getToken } from "next-auth/jwt"

const handler = (req:Request,res:Response)=>{
    return fetchRequestHandler({
        endpoint:"/api/trpc",
        req,
        router:appRouter,
        createContext:async()=>createContext()
        
    })
}

export {handler as GET, handler as POST}