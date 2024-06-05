"use server";
import { eq } from 'drizzle-orm';
import { db } from '../../../../database/db';
import {configurationimage} from '../../../../database/schemes/configurationimage'

export type SaveConfigArgs={
    color:string,
    finish:string,
    material:string,
    model:string,
    configId:string,
    imageUrl:string
}

export async function saveConfig({
  color,
  finish,
  material,
  model,
  imageUrl
}:SaveConfigArgs) {

    try{
        await db.insert(configurationimage).values({imageUrl,color,finish,material,model})
    }catch(err){
        console.log('error updating settings',err)
    }

}



// {
//     color:typeof caseColor,
//     finish:typeof caseFinish,
//     material:typeof caseMaterial,
//     model:typeof phoneModel,
//     configId:string
// }
