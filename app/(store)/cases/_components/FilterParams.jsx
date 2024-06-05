'use client'

import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "../../../../components/ui/button";
import { useRouter } from "next/navigation";


const FilterParams = () => {
    let searchParams = useSearchParams();
    const router=useRouter()
    const pathname=usePathname()
    // Convertir el iterador a un array y luego usar .map()
    const params = Array.from(searchParams.entries())

   

    const paramsArray= params?.map(([key,value])=>{
        return value.split('%').map(item=>{
           return [[key],[item]]
        })

   }).flat()

   console.log('filterpARAMS',paramsArray)

    const handleDeleteParam=(key,value)=>{
        const params= new URLSearchParams(searchParams.toString())

        const currentValues = params.get(key)?.split('%') ?? [];

        if (currentValues?.includes(value)) {
          const newParams = currentValues.filter(param=>param !== value).join('%')
          if(newParams === ''){
            params.delete(key)
            console.log('paramss',params)
          }else{
            params.set(key, newParams);
          }
        } else {
          currentValues.push(value)
          const newParams = currentValues.join('%')
          params.set(key, newParams);
        }
    
        router.push(pathname + '?' + params.toString());        

    }

  return (
    <div className="py-3">
        <div className="flex gap-5 items-center">
            {
                paramsArray.map(([key,value])=>(
                    <Button key={key} onClick={()=>handleDeleteParam(key.toString(),value.toString())} className="h-6 rounded-2xl border border-primary">
                        <p className="capitalize text-xs font-semibold">{value}</p>
                        <span className="text-red-300 font-bold ml-1">X</span>
                    </Button>
                ))
            }
        </div>
    </div>
  )
}

export default FilterParams