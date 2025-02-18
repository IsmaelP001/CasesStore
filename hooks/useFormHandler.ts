import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z, ZodSchema } from "zod";

const useFormHandler =<T extends ZodSchema> (formSchema:T,defaultValues:z.infer<T>) => {
 
    const [isInputChanged,setIsInputChanged]=useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues
    });

    useEffect(() => {
        const subscription = form.watch((value, { name, type }) =>{
          if(type === 'change' && !isInputChanged){
            setIsInputChanged(true)
          } 
         }   
        )
        return () => subscription.unsubscribe()
      }, [form.watch,form,isInputChanged])

    return {
        form,
        isInputChanged,
        setIsInputChanged
    }

}

export default useFormHandler