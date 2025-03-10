"use client";
import { FaTrash } from "react-icons/fa6";
import { Input } from "../ui/input";
import Phone from "../../app/(store)/_components/Phone";
import { cn, formatPrice } from "../../lib/utils/utils";
import Loading from "../Loading";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useState } from "react";
import useCartItemsActions from "@/hooks/useCartItemsActions";
import Image from "next/image";
import { CartItemQueryElement } from "@/server/cart/domain/models";

interface CartItemProps {
  item: CartItemQueryElement;
}

const CartItem = ({ item }: CartItemProps) => {
  const {
    configurationImage,
    configurationId,
    quantity,
    device,
    name,
    price,
    productId,
    coverImage,
    colorId,
    inStock,
  } = item;


  const [newQuantity, setNewQuantity] = useState<number>(quantity);
  const handleChangeState = (value: number) => {
    setNewQuantity((prev: any) => value);
  };
  const { handleQuantityChange, isPendingUpdate } = useCartItemsActions(
    () => handleChangeState(quantity),
    true
  );

  const debouncedHandleQuantityChange = useDebouncedCallback(() => {
    if (newQuantity > inStock) return;
    handleQuantityChange({
      colorId,
      deviceId: device?.id,
      newQuantity,
      prevQuantity: quantity,
      productId: productId!,
      configurationId,
    });
  }, 400);

  useEffect(() => {
    handleChangeState(quantity);
  }, [quantity]);

  return (
    <article className="hover:bg-base-300 px-4 py-1">
      <div className="border-b border-b-neutral grid grid-cols-4 gap-1 text-center justify-between items-center">
        <figure className="w-20 h-20 relative flex justify-center">
          {configurationImage ? (
            <Phone
              imgSrc={configurationImage || '/'}
              className="absolute inset-0 w-9 h-[74px] m-auto"
            />
          ) : (
            <Image
              src={coverImage || "/mock.phone.png"}
              className="h-full w-full rounded-md object-cover"
              fill
              alt={`${name} cart item image`}
            />
          )}
        </figure>

        {/* PRODUCT-INFO */}
        <div className="flex flex-col col-span-2 capitalize pt-3 ">
          <div className="flex gap-1">
            <h4 className="text-sm font-extrabold text-neutral text-left truncate text-ellipsis">
              {name}
            </h4>
          </div>
          <span className="text-xs font-medium tracking-widest text-left mb-1">
            {device?.name}
          </span>
          <div className="">
            <p className="text-xs text-left font-semibold">
              {formatPrice(price!)}
            </p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="">
          <form
            onSubmit={(e) => e.preventDefault()}
            className={cn(
              "flex gap-3 items-center bg-slate-200 rounded-2xl",
              inStock <= newQuantity && "border-2 border-red-300"
            )}
          >
            <Input
              type="hidden"
              defaultValue={productId}
              name="productId"
            ></Input>
            <button
              className="w-7 h-7 grid place-content-center"
              disabled={isPendingUpdate}
              data-id="DECREASE"
              onClick={() => {
                handleChangeState(newQuantity < 1 ? 0 : newQuantity - 1);
                debouncedHandleQuantityChange();
              }}
            >
              {newQuantity <= 1 ? (
                <FaTrash className="text-lg text-red-600" />
              ) : (
                <span className="font-bold text-xl text-primary">-</span>
              )}
            </button>
            <div className="max-h-20 w-4 text-center">
              {isPendingUpdate ? <Loading size={15} /> : <span>{newQuantity}</span>}
            </div>
            <button
              className="w-7 h-7 grid place-content-center text-xl text-black"
              disabled={isPendingUpdate || inStock <= newQuantity}
              data-id="INCREASE"
              onClick={() => {
                handleChangeState(newQuantity + 1);

                debouncedHandleQuantityChange();
              }}
            >
              +
            </button>
          </form>
          {inStock <= newQuantity && inStock ? <p className="text-[0.7rem]">Solo {inStock} Disponible</p>:null}

        </div>
      </div>
    </article>
  );
};

export default CartItem;
