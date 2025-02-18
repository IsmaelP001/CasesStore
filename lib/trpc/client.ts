'use client'
import { createTRPCReact} from "@trpc/react-query"
import { createServerSideHelpers } from '@trpc/react-query/server';
import { createContext } from '@/server/context';
import { appRouter, type AppRouter } from "@/server"


export const trpc = createTRPCReact<AppRouter>()



