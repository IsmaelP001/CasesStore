"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../../../lib/data/products";
import Image from "next/image";
import { getCompatibleProducts } from "../../_lib/data";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
} from "../../../../components/ui/select";
import { SelectContent, SelectValue } from "@radix-ui/react-select";
import { Button } from "../../../../components/ui/button";
import Link from "next/link";
import { formatPrice } from "../../../../lib/utils/utils";
import { addCartItem } from "../../../../lib/actions/cart";

const SingleProductPage = ({ id }) => {

  const { data: product, isPending:isPendingProduct } = useQuery({
    queryKey: ["singleProduct",id],
    queryFn: () => getProductById(id),
  });


  if (isPendingProduct) {
    <div className="h-min-screen">
      <p>Loading...</p>
    </div>;
  }


  const {
    id: productId,
    name,
    images,
    price,
    collection,
    stock,
    printPattern,
    productDevices
  } = product || {};

  return (
    <div className="grid grid-col-1 lg:grid-cols-3 pt-10">
      <div className=" col-span-2  flex justify-center items-start ">
        <div className="relative w-[600px] h-[600px]">
           <Image className="" src={images?images[0].image:null} fill alt={name}  />
        </div>
      </div>

      <form action={addCartItem} className="border-l-2 border-gray-300 px-5">
        <header className="space-y">
          <h2 className="text-3xl font-semibold">Funda <span>{name}</span></h2>
          <h4 className="text-xl capitalize font-semibold">{collection?.name}</h4>
          <p className="text-base capitalize">{printPattern?.name}</p>
          <p className="text-xl">{formatPrice(price)}</p>
          <p className="capitalize">{}</p>
        </header>
        <div className='mt-5'>
          <p className="text-sm font-semibold">En almacen: <span className="font-normal">{stock}</span></p>
        </div>
        <div>
          <div className="space-y-2 mb-5 mt-16">
            <Label className="text-base font-semibold">
              Selecciona tu modelo
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Modelo" />
              </SelectTrigger>
              <SelectContent className=" bg-white">
                {productDevices?.map(({devices}) => (
                  <SelectItem
                    key={devices.id}
                    name='deviceId'
                    value={devices.name}

                    className="w-full"
                  >
                    {devices.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-24">
           <input value={1} type='hidden' name="colorId"></input>
           <input value={productId} type='hidden' name="productId"></input>
           <Button type="button" asChild>
            <Link className="" href={'/configure/design'}>
                Crea tu propia funda
            </Link>
            </Button>
            <Button type="submit">Añadir al carrito</Button>
           
        </div>
      </form>
    </div>
  );
};

export default SingleProductPage;
