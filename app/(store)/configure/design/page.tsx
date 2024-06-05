import { notFound } from "next/navigation"
import { db } from "../../../../database/db"
import { eq } from "drizzle-orm"
import { configurationimage } from "../../../../database/schemes"
import DesignConfigurator  from "./DesignConfigurator"
import DesignConfigurationFabric from './DesignConfigurationFabric2'
export const revalidate = 0
interface PageProps {
  searchParams:{
    [key:string]:string | string[] | undefined
  }
}

const page = async({searchParams}:PageProps) => {

  const {id}=searchParams

  // if(!id || typeof id!== "string"){
  //   return notFound();
  // }

  // const configuration = await db.query.configurationimage.findFirst({
  //   where:eq(configurationimage.id,id)
  // })

  // if(!configuration){
  //   return notFound();
  // }

  // const {imageUrl,width,height}=configuration || {}

  return (
    <>
        {/* <DesignConfigurator configId={id} imageUrl={imageUrl} imageDimensions={{width,height}}/> */}
        <DesignConfigurationFabric  />
    </>
  )
}

export default page