"use client";

import { Label } from "../../../../components/ui/label";
import { Button } from "../../../../components/ui/button";
import { cn, formatPrice } from "../../../../lib/utils/utils";
import { useMemo, useState } from "react";
import { trpc } from "@/lib/trpc/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useFavoriteActions from "@/hooks/useFavoriteActions";
import Loading from "@/components/Loading";
import useCartItemsActions from "@/hooks/useCartItemsActions";
import SliderImages from "./SliderImages";

type BREAD_CRUBS_ITEM = {
  label: string;
  value: string;
  path?: string;
  isCurrentPath?: boolean;
};
const BREAD_CRUBS_ITEMS: BREAD_CRUBS_ITEM[] = [
  { value: "home", label: "Inicio", path: "/" },
  { value: "catalog", label: "Catalogo", path: "/cases" },
];

const SingleProductPage = ({ id }: { id: string }) => {
  const [modelSelected, setModelSelected] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const { addItemToFavoriteAction, isPending: isPendingFavorite } =
    useFavoriteActions();
  const { handleAddCartItem, isPending } = useCartItemsActions();
  const [product] = trpc.catalog.getProductsById.useSuspenseQuery({
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
    description
  } = product || {};

  const inStock = useMemo(() => {
    return devices?.find((device) => device.id === modelSelected?.id)?.inStock;
  }, [modelSelected, devices]);

  const currentBreadCrumItem: BREAD_CRUBS_ITEM = {
    label: product?.name || "",
    value: "productById",
    path: "",
    isCurrentPath: true,
  };

  return (
    <section className=" md:pt-4  md:px-5 lg:mx-10 mb-5 min-h-dvh">
      <div className="mb-3 ml-6 hidden md:block">
        <Breadcrumb>
          <BreadcrumbList className=" font-medium text-base ">
            {[...BREAD_CRUBS_ITEMS, currentBreadCrumItem]?.map((item) => (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink
                   href={item.path}
                    className={cn(item?.isCurrentPath && "text-accent")}
                  >
                    {item.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {!item.isCurrentPath && <BreadcrumbSeparator />}
              </>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className=" grid gap-3 grid-rows-2 grid-cols-1 md:grid-cols-9 lg:grid-cols-12 md:grid-rows-none ">
        <div className="relative w-full md:col-span-5  lg:col-span-8  flex justify-center items-start ">
          <SliderImages images={images!} />
        </div>

        <div className=" grid grid-rows-[auto_1fr_auto] gap-y-6 md:min-h-[73svh] md:col-span-4 lg:col-span-4 px-6 md:px-2 w-full ">
          <div className="md:space-y-6">
            <header className="space-y-0">
              <h2 className="quicksand text-3xl font-medium">
                Cover <span>{name}</span>
              </h2>
              <h4 className="quicksand font-medium  text-gray-500 capitalize">
                {collection?.name}
              </h4>
              <p className="quicksand font-medium text-gray-500 capitalize">
                {printPattern?.name}
              </p>
              <div className="text-xl pt-2 ">
                {discountPrice ? (
                  <p className="space-x-2 relative w-fit">
                    <span className="text-accent font-semibold animate-pulse">
                      {formatPrice(discountPrice)}
                    </span>
                    <span className="absolute -top-3 bg-red-400 py-1 px-2 font-semibold text-white  rounded-xl -right-[75px] line-through text-xs ">
                      {formatPrice(price!)}
                    </span>
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
              <div className="">
                <Label className=" block text-base font-semibold mb-2">
                  Selecciona tu modelo
                </Label>
                <Select
                  onValueChange={(val) => {
                    const selectedItem = devices?.find(
                      (item) => item.id === val
                    );
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
          </div>
          <div>
            <p className="font-light">{description}</p>
          </div>
          <div className="space-y-2 ">
            <Button
              className=" flex gap-2  w-full bg-pink-700 hover:bg-pink-700/50"
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
                  isAddItemFirstTime: true,
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
