"use client";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { signin } from "./action";
import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";


const LoginPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams();
  const callbackUrl=searchParams?.get('callbackUrl') || '/';
  const [authProviders, setAuthProviders] = useState(null);
  const [error,setError]=useState(null)
  useEffect(() => {
    getProviders()
      .then((providers) => {
        const filteredProviders = Object.values(providers).filter(
          (provider) => provider.name != "Auth0" && provider.name != 'credentials'
        );
        setAuthProviders(filteredProviders);
      })
      .catch((err) => console.log("error getting providers", err));
  }, []); 


  // const { mutate } = useMutation({  
  //   mutationKey: ["login"],
  //   mutationFn: signin,
  //   onSuccess: (data) => {
  //     // queryClient.setQueryData('user',data)
  //     console.log(data);
  //   },
  //   onError: (e) => {
  //     console.log("error al iniciar seccion");
  //   },
  // });

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const formData = new FormData(e.target)
    const { email, password } = Object.fromEntries(formData);

    try{
      const res = await signIn('credentials',{
        email,
        password,
        redirect:false
      })

      if(!res?.ok){
        
        const respError = res?.error?.split('/') || null
        setError(respError)
      }else{
        router.push(`/${callbackUrl}`)
      }
    }catch(err){
      console.log('error',err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center  ">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-100 p-5 rounded-xl space-y-5 w-[400px]"
      >
        <h2 className="text-2xl font-semibold">Iniciar sección</h2>
        <div className="flex flex-col gap-2">
          {authProviders &&
            authProviders?.map((provider) => {
              return (
                <Button
                  variant="outline"
                  onClick={() => signIn(provider.id,{
                    redirect:true,
                    callbackUrl:callbackUrl
                  })}
                  className="bg-transparent border border-primary"
                  key={provider.id}
                  asChild
                >
                  <div className='flex  gap-4 justify-center items-center p-1'>
                    <FcGoogle className="text-2xl" />
                    <span className="text-base font-medium">Inicia seccion con {provider.name}</span>
                  </div>
                </Button>
              );
            })}
        </div>

        <div className="flex items-center justify-center gap-2  w-[150px] m-auto">
          <div className="border border-primary flex-1" />
          <div className="text-xl font-medium">O</div>
          <div className="border border-primary flex-1" />
        </div>
        <div>
          <Label className="label font-semibold">Correo</Label>
          <Input
            type="text"
            name="email"
            required
            className="input input-primary input-md w-full"
          ></Input>
           {error && error[0] === 'email' && <p className="text-red-500 text-xs mt-0.5 ml-1 font-medium  ">{error[1]}</p>}

        </div>
        <div>
          <Label className="label font-semibold">Contraseña</Label>
          <Input
            type="password"
            name="password"
            required
            className="input input-primary input-md w-full"
          ></Input>
          {error && error[0] === 'password' && <p className="text-red-500 text-xs mt-0.5 ml-1 font-medium  ">{error[1]}</p>}

        </div>

        <div>
          <Button type="submit" className="btn-primary w-full">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
