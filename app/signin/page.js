'use client'
import { QueryClient, useMutation } from "@tanstack/react-query"
import { signin } from "./action"



const LoginPage = () => {


  const{mutate}=useMutation({
    mutationKey:['login'],
    mutationFn:signin,
    onSuccess:(data)=>{
      // queryClient.setQueryData('user',data)
      console.log(data)
    },
    onError:(e)=>{
      console.log('error al iniciar seccion')
    }
  })

    
    
  return (
    <div className="min-h-screen grid place-content-center ">
        <form action={mutate} className="form bg-base-300 p-10 rounded-xl space-y-5 min-w-[400px]">
            <div>
                <label className="label font-semibold">Nombre</label>
               <input type="text" name="username" required className="input input-primary input-md w-full"></input>
            </div>
            <div>
                <label className="label font-semibold">Contraseña</label>
               <input type="password" name="password" required className="input input-primary input-md w-full"></input>
            </div>

            <div>
                <button type="submit" className="btn btn-primary btn-block">Login</button>
            </div>
        </form>
    </div>
  )
}

export default LoginPage