import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const useHandleParams = () => {

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const params = new URLSearchParams(searchParams.toString());

    const setParams = (name:string, value:string) => {
      params.set(name, value);
      router.push(pathname + "?" + params.toString());
    };

    const setRemoveConsecutiveParam = (key:string, value:string) => {
        const currentValues = params.get(key)?.split('%') ?? [];
    
    
        if (currentValues?.includes(value)) {
          const newParams = currentValues.filter(param=>param !== value).join('%')
          if(newParams === ''){
            params.delete(key)
          }else{
            params.set(key, newParams);
          }
        } else {
          currentValues.push(value)
          const newParams = currentValues.join('%')
          params.set(key, newParams);
        }
    
        router.push(pathname + '?' + params.toString());
      };

      
    

    const setMultipleParams = (paramsObj: Record<string, string>) => {
      
      Object.entries(paramsObj).forEach(([key, value]) => {
        params.set(key, value);
      });
  
      router.push(pathname + "?" + params.toString());
    };
  
    const getParam=(name:string)=>{
      return params.get(name) || ""
    }

    const getAllParams=()=>{
      return Object.fromEntries(params)
    }

    const removeParam=(name:string)=>{
      params.delete(name)
      router.push(pathname + "?" + params.toString());
    }

    const clearParams=()=>{
      router.push(pathname);
    }

  return {
    setParams,
    getParam,
    setMultipleParams,
    removeParam,
    clearParams,
    getAllParams,
    setRemoveConsecutiveParam,
    searchParamsObj:Array.from(searchParams.entries())
  }
}

export default useHandleParams