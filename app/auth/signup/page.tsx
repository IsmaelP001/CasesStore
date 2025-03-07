"use client";
import Image from "next/image";
import { Button, buttonVariants } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useFormHandler from "@/hooks/useFormHandler";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/components/Loading";
import { singUpSchema } from "@/lib/schemas/authSchema";
import { trpc } from "@/lib/trpc/client";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils/utils";



const SignupPage = () => {
  const { form, isInputChanged } = useFormHandler(singUpSchema, {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router=useRouter()
  const {toast}=useToast()

  const {mutateAsync,isPending,error}=trpc.user.createUser.useMutation({
    onSuccess(){
      toast({
        title:'Exito!',
        description:'Registro con exito, inicia seccion.',
      })
      router.push('/auth/signin')
    },
    onError(err){
      if(err.data?.code === 'FORBIDDEN'){
        form.setError('email',{message:err.message})
        return
      }
      toast({
        title:'Error!',
        description:'Un error inesperado ha ocurrido, intentalo mas tarde.',
        variant:'destructive'
      })
    }
  })

  const handleSubmit = async(values: z.infer<typeof singUpSchema>) => {
    await mutateAsync(values)
  };

  return (
    <div className="relative min-h-screen flex  items-center justify-center bg-gray-200 px-2">
      <div>
        <Link href="/" className={cn(buttonVariants({variant:'outline',size:'sm',className:'absolute top-2 left-2 flex items-center gap-2 px-3 rounded-2xl'}))}>
           <ArrowLeft/>  Regresar a la tienda
        </Link>
      </div>
      <section className=" md:grid md:grid-cols-10 bg-white rounded-xl">
        <div className=" p-6 min-w-[400px] md:col-span-4  h-full">
          <h2 className="text-2xl font-semibold mb-2">Registrarse</h2>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className=" space-y-6"
            >
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          placeholder="ej: Tu nombre"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellido</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          placeholder="ej: Tu apellido"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                        placeholder="ej: Tu contraseña"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar contraseña</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        type="password"
                        placeholder="ej: Confirmar contraseña"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <p className="text-sm font-medium">
                  Ya tienes una cuenta?,{" "}
                  <Link
                    className="text-sm text-blue-500 font-medium"
                    href="/auth/signin"
                  >
                    Inicia sessión
                  </Link>
                </p>
              </div>
              <Button disabled={!isInputChanged || isPending} type="submit" className="btn-primary w-full">
                 {isPending ? <p className="flex items-center gap-2"><span>Registrando <Loading/></span></p>: <span>Registrarse</span>}
              </Button>
            </form>
          </Form>
        </div>
        <div className="hidden md:block overflow-hidden bg-blue-200 [@media(min-width:910px)]:block md:col-span-6 relative min-w-[200px] w-full min-h-[300px] h-full rounded-r-xl">
          <figure className=" absolute bottom-16 left-[50%] transform -translate-x-[calc(50%-100px)] z-0">
            <div className="relative w-[120px] h-[200px] md:w-[400px] md:h-[400px]">
              <Image
                fill
                className=" object-contain"
                alt="image-2"
                src="https://erikstore.com/blog/wp-content/uploads/2023/09/Katsuki-Bakugo.webp"
              />
            </div>
          </figure>

          <figure className=" absolute left-1/2 transform -translate-x-1/2  -bottom-48  z-20">
            <div className="relative   w-[500px] h-[450px]">
              <Image
                fill
                className=" object-contain"
                alt="image-1"
                src="https://bleach-anime.com/assets/img/character/chara_01.png"
              />
            </div>
          </figure>

          <figure className=" absolute -bottom-0 left-[50%] transform -translate-x-[calc(50%+220px)] z-10">
            <div className="relative w-[100px] h-[120px] md:w-[480px] md:h-[380px]">
              <Image
                fill
                className=" object-contain"
                alt="image-3"
                src="https://i.redd.it/bleach-the-locus-of-brave-individual-artwork-compilation-v0-3auopsveuboc1.png?width=800&format=png&auto=webp&s=e0e3870d227145b39aa31339940cb09c8ba6f851"
              />
            </div>
          </figure>
        </div>
      </section>
    </div>
  );
};

export default SignupPage;
