"use client";
import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";
import {
  PRODUCT_PRICES,
  BASE_PRICE,
} from "../../../../validators/product-prices";
import { configurationimage, material } from "../../../../database/schemes";
import { cn, formatPrice } from "../../../../lib/utils/utils";
import {
  COLORS,
  MATERIALS,
  MODELS,
} from "../../../../validators/option-validator";
import { Check } from "lucide-react";
import Phone from "../../_components/Phone";
import { Button, buttonVariants } from "../../../../components/ui/button";
import Image from "next/image";
import { Label } from "../../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCompatibleProducts } from "../../_lib/data";
import { Radio } from "@headlessui/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { addCartItem } from "../../../../lib/actions/cart";
import { promise } from "zod";
import { updateConfigurationImage } from "../../_lib/action";
import { RadioGroup,RadioGroupItem } from "../../../../components/ui/radio-group";
import { useToast } from "../../../../components/ui/use-toast";
import { ToastAction } from "../../../../components/ui/toast";
import { useDispatch } from "react-redux";
import { setIsCartOpen } from "../../../../lib/features/cart/cartSlice";


const getOptions = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(sessionStorage?.getItem("PERSONALIZE_CASE_OPTIONS"));

  }

};

const IMAGES_DEFAULT = [
  "https://img.freepik.com/foto-gratis/hermosa-escena-dibujos-animados-personajes-anime_23-2151035157.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Anime_Girl.png/1280px-Anime_Girl.png",
  "https://miro.medium.com/v2/resize:fit:1400/1*ojm6dLZGKYCu1hfsIzQCVw.png",
];

const DesignPreview = ({ configuration }) => {
  const [showConfetti, setConfetti] = useState(false);
  const [imagePreview, setImagePreview] = useState(IMAGES_DEFAULT[0]);
  const { id, imageUrl, width, height } = configuration || {};
  const {toast}=useToast()
  const [options, setOptions] = useState(
    getOptions() || {
      model: MODELS.options[0].value,
      material: MATERIALS.options[0].value,
    }
  );
  const dispath = useDispatch()

  const { data: compatibleProducts } = useQuery({
    queryKey: ["compatibleproducts"],
    queryFn: async()=>await getCompatibleProducts(),
  });

  useEffect(() => {
    setConfetti(true);
  }, []);

  useEffect(() => {
    if (imageUrl) return;
    let index = 0;
    const intervalId = setInterval(() => {
      index = Math.floor(Math.random() * IMAGES_DEFAULT.length);
      setImagePreview(IMAGES_DEFAULT[index]);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const { mutate: addToCartAction } = useMutation({
    mutationKey: ["addPersonalizedCase"],
    mutationFn: async (FormData) => {
      await Promise.all([
        addCartItem(FormData),
        updateConfigurationImage(FormData),
      ]);
    },
    onSuccess: (data) => {
      toast({
        title: "Carrito",
        description: "Articulo añadido con exito",
        variant: "default",
        action: <ToastAction altText="Ver carrito" onClick={()=>dispath(setIsCartOpen({isCartOpen:true}))}>Ver carrito </ToastAction>
      });    },
    onError: (err) => {
      toast({
        title: "Carrito",
        description:
          "Hubo un  error al añadir el articulo, por favor intente mas tarde.",
        variant: "destructive",
      });    },
  });



  console.log("materialPrice",options.material,BASE_PRICE)
  console.log('config',compatibleProducts)

  // const { data: compatibleProducts, isPending: isPendingCompatibleProducts } =
  //   useQuery({
  //     queryKey: ["compatibleProduct"],
  //     queryFn: () => getCompatibleProducts(),
  //   });

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center"
      >
        {id && (
          <Confetti
            active={showConfetti}
            config={{ elementCount: 200, spread: 90 }}
          />
        )}
      </div>

      <div className="grid grid-col-1 lg:grid-cols-3 pt-8 pb-5">
        <div className="col-span-2  flex justify-center pb-2">
          <div className="relative ">
            <Phone
              imgSrc={imageUrl || imagePreview}
              dark={false}
              className={cn("max-w-[150px] md:max-w-[280px]")}
            ></Phone>
          </div>
        </div>

        <form
          action={addToCartAction}
          className="border-l-2 border-gray-300 px-5"
        >
          <header className="space-y-2">
            <h2 className="text-3xl font-semibold">Tú funda personalizada</h2>
            <p className="text-xl">
              {formatPrice(BASE_PRICE + options?.material?.price || 0)}
            </p>
          </header>
          <div>
            <div className="space-y-2 mb-5 mt-10">
              <Label className="text-base font-semibold">
                Selecciona tu modelo
              </Label>
              <Select
                onValueChange={(value) => {
                  setOptions((prev) => {
                    const newOptions = { ...prev, model: value };
                    if (typeof window !== 'undefined') {
                      sessionStorage.setItem(
                        "PERSONALIZE_CASE_OPTIONS",
                        JSON.stringify(newOptions)
                      );
                    }
                    return newOptions;
                  });
                }}
                name="model"
                defaultValue={options.model}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Modelo" />
                </SelectTrigger>
                <SelectContent className=" bg-white">
                  {compatibleProducts?.map((product) => (
                    <SelectItem
                      key={product.value}
                      value={product.name}
                      className="w-full"
                    >
                      {product.name ?? ""}
                      <input type="hidden" name="deviceId" value={product?.id}></input>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
{/* 
            <div className="space-y-2">
              <div className="flex flex-col gap-6">
                {[MATERIALS].map(({ name, options: selectableOptions }) => (
                  <RadioGroup
                    key={name}
                    onChange={(material) => {
                      setOptions((prev) => {
                        console.log("materialsdsd", name, material);
                        const newOptions = { ...prev, material };
                        sessionStorage.setItem(
                          "PERSONALIZE_CASE_OPTIONS",
                          JSON.stringify(newOptions)
                        );
                        return newOptions;
                      });
                    }}
                  >
                    <Label className="text-base font-semibold">
                      {name.slice(0, 1).toUpperCase() + name.slice(1)}
                    </Label>
                    <div className="mt-3 space-y-4">
                      {selectableOptions.map((option) => (
                        <RadioGroup.Option
                          key={option.value}
                          value={option}
                          className={({ active, checked }) => {
                            const isMaterialStorage =
                              JSON.parse(
                                sessionStorage.getItem(
                                  "PERSONALIZE_CASE_OPTIONS"
                                )
                              )?.material?.value === option.value;
                            return cn(
                              "relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between",
                              {
                                "border-primary":
                                  active || checked || isMaterialStorage,
                              }
                            );
                          }}
                        >
                          <span className="flex items-center">
                            <span className="flex flex-col text-sm">
                              <RadioGroup.Label
                                className="font-medium text-gray-900"
                                as="span"
                              >
                                {option.label}
                              </RadioGroup.Label>

                              {option.description ? (
                                <RadioGroup.Description
                                  as="span"
                                  className="text-gray-500"
                                >
                                  <span className="block sm:inline">
                                    {option.description}
                                  </span>
                                </RadioGroup.Description>
                              ) : null}
                            </span>
                          </span>

                          <RadioGroup.Description
                            as="span"
                            className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right"
                          >
                            <span className="font-medium text-gray-900">
                              {option.price === 0
                                ? "Gratis"
                                : formatPrice(option.price)}
                            </span>
                          </RadioGroup.Description>
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                ))}
              </div>
            </div> */}

            <div className="space-y-2">
              <div className="flex flex-col gap-6">
                <Label className="text-base font-semibold capitalize">{MATERIALS.name}</Label>
                <RadioGroup defaultValue={options.material}  onValueChange={(material)=>{
                         setOptions((prev) => {
                          const newOptions = { ...options.material,material  };
                          if (typeof window !== 'undefined'){
                            sessionStorage.setItem(
                              "PERSONALIZE_CASE_OPTIONS",
                              JSON.stringify(newOptions)
                            );
                          }

                          return newOptions;
                        });
                      }}>
                 {
                  MATERIALS.options.map(material=>{
                    return (
                      <div className="flex items-center space-x-2">
                      <RadioGroupItem value={material}  checked={material.id == options.material.id ? true : false} id={material.label} className='hidden' />
                      <Label htmlFor={material.label} className={`block w-full border-2 py-6 px-4 border-gray-200 rounded-xl ${material.id === options.material.id ? 'border-primary':''}`}>
                        <div className='flex items-center justify-between '>
                          <div>
                            <p>{material.label}</p>
                            <span>{material.description ?? ''}</span>
                          </div>
                          <p>{material.price}</p>
                          <input type="hidden" value={material.id} name="productId"></input>
                        </div>
                      </Label>
                    </div>
                    )
                  })
                 }
                
                 
                </RadioGroup>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-16">
            <input type="hidden" name="configurationId" value={id}></input>
          
            <input type="hidden" name="colorId" value={1}></input>
            <div className="flex gap-2">
              {!imageUrl && (
                <Button
                  type="button"
                  size="sm"
                  asChild
                  className="flex-1 rounded-2xl"
                >
                  <Link href="/configure/design" className={"flex-1"}>
                    Personalizar
                  </Link>
                </Button>
              )}
              {imageUrl && (
                <Button type="button" className="flex-1">
                  Añadir al favoritos
                </Button>
              )}
            </div>

            {imageUrl && <Button type="submit">Añadir al carrito</Button>}
          </div>
        </form>
      </div>
    </>
  );
};

export default DesignPreview;
