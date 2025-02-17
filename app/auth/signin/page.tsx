"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { getProviders, signIn } from "next-auth/react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { FcGoogle } from "react-icons/fc";
import useFormHandler from "@/hooks/useFormHandler";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

interface AuthProvider {
  id: string;
  name: string;
}

const signInSchema = z.object({
  email: z.string().email({ message: "Correo electronico no valido" }),
  password: z
    .string()
    .min(1, { message: "La contraseña debe contener almenos 1 caracter" }),
});

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callback") || "/";
  
  const [authProviders, setAuthProviders] = useState<AuthProvider[] | null>(
    null
  );
  const { form, isInputChanged } = useFormHandler(signInSchema, {
    email: "",
    password: "",
  });
  const {toast}=useToast()

  useEffect(() => {
    getProviders()
      .then((providers) => {
        if (providers) {
          const filteredProviders = Object.values(providers).filter(
            (provider) =>
              provider.name !== "Auth0" && provider.name !== "credentials"
          ) as AuthProvider[];
          setAuthProviders(filteredProviders);
        }
      })
      .catch((err) => console.error("Error getting providers:", err));
  }, []);

  const handleSubmit = async (values: z.infer<typeof signInSchema>) => {
    const { email, password } = values;

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (!res?.ok) {
        const respError = res?.error?.split("/") as [string, string] | null;
        if(respError?.length! >= 2){
          const path = respError?.[0]
          const message=respError?.[1]
          form.setError(path as any,{message})
          return
        }
        toast({
          title:'Error',
          description:"Un error inesperado ha ocurrido. Por favor, intentelo mas tarde",
          variant:'destructive'
        })
      } else {
        router.push(callbackUrl);
      }
    } catch (err) {
      console.error("Error signing in:", err);
    }
  };

  return (
    <div className="min-h-screen flex  items-center justify-center bg-gray-200">
      <section className=" space-y-2 flex flex-col-reverse md:grid md:grid-cols-10 bg-white rounded-xl">
        <div className="hidden  md:block overflow-hidden bg-yellow-200 col-span-6  md:col-span-6 relative w-[500px] min-h-[400px] h-full rounded-l-xl">
     
          <figure className=" absolute -bottom-5 left-[50%] transform -translate-x-[calc(50%-100px)] z-0">
            <div className="relative w-[120px] h-[200px] md:w-[400px] md:h-[400px]">
              <Image
                fill
                className=" object-contain"
                alt="image-2"
                src="https://img.wattpad.com/806d2e452fc7735447c039a13a12d34501c926e9/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f615232614a6f414771424b5579413d3d2d3337303035383831322e313534303733666338316366623964663735363532353034363831342e706e67?s=fit&w=720&h=720"
              />
            </div>
          </figure>

          <figure className=" absolute left-1/2 transform -translate-x-1/2  bottom-0  z-20">
            <div className="relative   w-[500px] h-[450px]">
              <Image
                fill
                className=" object-contain"
                alt="image-1"
                src="https://es.ultrarumble.com/assets/Character/Ch001/GUI/FaceIcon/T_ui_Ch001_CharaImage.png"
              />
            </div>
          </figure>

          <figure className=" absolute -bottom-0 left-[50%] transform -translate-x-[calc(50%+110px)] z-10">
            <div className="relative w-[100px] h-[120px] md:w-[480px] md:h-[380px]">
              <Image
                fill
                className=" object-contain"
                alt="image-3"
                src="https://png.pngtree.com/png-clipart/20240308/original/pngtree-modern-stylish-anime-character-png-image_14547019.png"
              />
            </div>
          </figure>
        </div>
        <div className=" p-6 min-w-[350px] md:col-span-4 max-w-[350px]">
          <h2 className="text-2xl font-semibold mb-2">Iniciar sesión</h2>
          <div className="flex flex-col gap-2">
            {authProviders &&
              authProviders.map((provider) => (
                <Button
                  variant="outline"
                  onClick={() =>
                    signIn(provider.id, {
                      redirect: true,
                      callbackUrl,
                    })
                  }
                  className="bg-transparent border border-primary"
                  key={provider.id}
                  asChild
                >
                  <div className="flex gap-4 justify-center items-center p-1">
                    <FcGoogle className="text-2xl" />
                    <span className="text-base font-medium">
                      Inicia sesión con {provider.name}
                    </span>
                  </div>
                </Button>
              ))}
          </div>

          <div className="flex items-center justify-center gap-2 w-[150px] m-auto">
            <div className="border border-primary flex-1" />
            <div className="text-xl font-medium">O</div>
            <div className="border border-primary flex-1" />
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className=" space-y-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="ej: tucorreo@correo.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        type="password"
                        placeholder="shadcn"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <p className="text-sm font-medium">Aun no tienes una cuenta?, <Link className="text-sm text-blue-500 font-medium" href="/auth/signup" >Registrate</Link></p>
              </div>
              <Button disabled={!isInputChanged} type="submit" className="btn-primary w-full">
                Iniciar seccion
              </Button>{" "}
            </form>
          </Form>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
