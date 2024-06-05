'use server'

import { eq } from "drizzle-orm"
import { db } from "../../../database/db"
import { configurationimage } from "../../../database/schemes"

export const updateConfigurationImage=async(FormData)=>{
    const data = Object.fromEntries(FormData)
    const material=FormData.get('material')
    const configurationId=FormData.get('configurationId')
    const model=FormData.get('model')

    
    try{
        await db.update(configurationimage).set({material,model}).where(eq(configurationimage.id,configurationId))
    }catch(err){
        console.log('error',err)
    }
}