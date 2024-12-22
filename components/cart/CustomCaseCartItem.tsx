"use client";
import { FaTrash } from "react-icons/fa6";
import Phone from "../../app/(store)/_components/Phone";
import { formatPrice } from "../../lib/utils/utils";
import Loading from "../Loading";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useState } from "react";
import { CartItem, CartItemQueryElement, CustomCaseCartDetails } from "@/server/cart/domain/models";
import { trpc } from "@/utils/trpc/client";
import { Product } from "@/server/catalog/domain/product.model";

interface CartItemProps {
  item: CartItemQueryElement;
}

const CustomCaseCartItem = ({ item }: CartItemProps) => {
  const [newQuantity, setNewQuantity] = useState<number>(item.quantity);
  const handleChangeState = (value: number) => {
    setNewQuantity((prev: any) => value);
  };
  const utils=trpc.useUtils()
  const { mutate: handleQuantityChange, isPending } =
    trpc.cart.addItem.useMutation({
      onSuccess() {
        utils.cart.getItems.invalidate()
        utils.cart.getTotalCart.invalidate()
      },
      onError(err) {
        setNewQuantity(item.quantity)
        console.log('err custom case',err)
      },
    });

  const debouncedHandleQuantityChange = useDebouncedCallback(
    () =>
      handleQuantityChange({
        deviceId: item.device?.id,
        quantity: newQuantity - item.quantity,
        configurationId: item?.configurationId || undefined,
        productId: item.productId!,
      }),
    400
  );

  useEffect(() => {
    handleChangeState(item.quantity);
  }, [item.quantity]);


  return (
    <article className="hover:bg-base-300 px-4 py-1 border-b border-b-neutral">
      <div className=" grid grid-cols-4 gap-1 text-center justify-between items-center">
        <figure className="w-20 h-20 relative flex justify-center">
          <Phone
            imgSrc={item?.configurationImage || ''}
            className="absolute inset-0 w-9 h-[74px] m-auto"
          />
        </figure>

        {/* PRODUCT-INFO */}
        <div className="flex flex-col col-span-2 capitalize pt-3">
          <div className="flex gap-1">
            <h4 className="text-sm font-extrabold text-neutral text-left truncate text-ellipsis">
              Case personalizado
            </h4>
          </div>
          <span className="text-xs font-medium tracking-widest text-left mb-1">
            {item.quantity}
          </span>
          <div className="">
            <p className="text-xs text-left font-semibold">
              {formatPrice(parseFloat(item.price))}
            </p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex gap-3 items-center bg-slate-200 rounded-2xl"
          >
            <button
              className="w-7 h-7 grid place-content-center"
              disabled={isPending}
              data-id="DECREASE"
              onClick={() => {
                handleChangeState(newQuantity < 1 ? 0 : parseInt(newQuantity as any) - 1);
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
              {isPending ? <Loading size={15} /> : <span>{newQuantity}</span>}
            </div>
            <button
              className="w-7 h-7 grid place-content-center text-xl text-black"
              disabled={isPending}
              data-id="INCREASE"
              onClick={() => {
                handleChangeState(newQuantity + 1);

                debouncedHandleQuantityChange();
              }}
            >
              +
            </button>
          </form>
        </div>
      </div>
    </article>
  );
};

export default CustomCaseCartItem;
