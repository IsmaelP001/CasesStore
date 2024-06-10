import { notFound } from "next/navigation"
import { db } from "../../../../database/db"
import { eq } from "drizzle-orm"
import { configurationimage } from "../../../../database/schemes"
import DesignPreview from "./DesignPreview"
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export const revalidate = 0

interface PageProps{
    searchParams:{
        [key:string]:string | string[] |undefined
    }
}

const page =async ({searchParams}:PageProps) => {
  const queryClient = new QueryClient();
    const {id}=searchParams

    // if(!id || typeof id !=="string"){
    //     return notFound()
    // }

    let configuration=null
    if(id){
         configuration = await db.query.configurationimage.findFirst({
            where:eq(configurationimage.id,id)
        })
    }

    // if(!configuration){
    //     return notFound()
    // }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
       <DesignPreview configuration={configuration || null}/>
    </HydrationBoundary>

  )
}

export default page