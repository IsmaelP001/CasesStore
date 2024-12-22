"use client";

import { Label } from "../../../../components/ui/label";
import { Button } from "../../../../components/ui/button";
import { formatPrice } from "../../../../lib/utils/utils";
import { useMemo, useState } from "react";
import { trpc } from "@/utils/trpc/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SliderImages from "./SliderImages";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useFavoriteActions from "@/app/hooks/useFavoriteActions";
import Loading from "@/components/Loading";
import useCartItemsActions from "@/app/hooks/useCartItemsActions";

const SingleProductPage = ({ id }: { id: string }) => {
  const [modelSelected, setModelSelected] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const { addItemToFavoriteAction, isPending: isPendingFavorite } =
    useFavoriteActions();
  const { handleAddCartItem, isPending } = useCartItemsActions();
  const { data: product } = trpc.catalog.getProductsById.useQuery({
    id,
  });

  const {
    id: productId,
    name,
    images,
    price,
    color,
    collection,
    printPattern,
    devices,
    coverImage,
    discountPrice,
  } = product || {};

  const inStock = useMemo(() => {
    return devices?.find((device) => device.id === modelSelected?.id)?.inStock;
  }, [modelSelected, devices]);


  return (
    <section className="pt-10 px-3 md:px-10 mb-5 min-h-screen">
      <div className="mb-6 ml-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/cases">cubiertas</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="grid grid-rows-2 grid-cols-1 md:grid-cols-9 lg:grid-cols-12 md:grid-rows-none">
        <div className=" relative  md:col-span-5  lg:col-span-8  flex justify-center items-start ">
          <SliderImages images={images!} />
        </div>

        <div className="md:col-span-4 lg:col-span-4 px-3  w-full">
          <header className="space-y-2">
            <h2 className="text-3xl font-semibold">
              Funda <span>{name}</span>
            </h2>
            <h4 className="text-xl capitalize font-semibold">
              {collection?.name}
            </h4>
            <p className="text-base capitalize">{printPattern?.name}</p>
            <div className="text-xl">
              {discountPrice ? (
                <p className="space-x-2">
                  <span className="text-accent font-semibold">
                    {formatPrice(discountPrice)}
                  </span>
                  <span className=" line-through">{formatPrice(price!)}</span>
                </p>
              ) : (
                <p>{formatPrice(price!)}</p>
              )}
            </div>
          </header>
          <div className="mt-5">
            <p className="text-base font-semibold">
              En almacen:{" "}
              <span className="font-normal">
                {modelSelected === null ? (
                  "seleccione un dispositivo"
                ) : inStock! <= 0 ? (
                  <span className="text-red-600 font-medium">
                    Fuera de stock
                  </span>
                ) : (
                  inStock
                )}
              </span>
            </p>
          </div>
          <div>
            <div className="mt-10">
              <Label className=" block text-base font-semibold mb-5">
                Selecciona tu modelo
              </Label>
              <Select
                onValueChange={(val) => {
                  const selectedItem = devices?.find((item) => item.id === val);
                  setModelSelected({
                    id: selectedItem?.id!,
                    name: selectedItem?.name!,
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un dispositivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {devices?.map((device) => (
                      <SelectItem key={device.id} value={device.id}>
                        {device.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2 mt-24">
            <Button
              className=" flex gap-2  w-full bg-pink-700"
              type="button"
              disabled={isPendingFavorite}
              onClick={() => addItemToFavoriteAction({ productId: productId! })}
            >
              {!isPendingFavorite ? (
                <span>Añadir a favoritos</span>
              ) : (
                <span className="flex gap-2">
                  {" "}
                  Añadiendo a favoritos <Loading />
                </span>
              )}
            </Button>

            <Button
              className="block w-full"
              type="button"
              disabled={inStock! <= 0 || !inStock || isPending}
              onClick={() =>
                handleAddCartItem({
                  productId: productId!,
                  name: name!,
                  colorId: color?.id,
                  quantity: 1,
                  coverImage: coverImage!,
                  price: price!,
                  device: modelSelected!,
                  deviceId: modelSelected?.id!,
                })
              }
            >
              Añadir al carrito
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProductPage;
