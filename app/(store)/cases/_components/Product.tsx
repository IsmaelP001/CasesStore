'use client'
import Image from "next/image";
import Link from "next/link";
import { cn, formatPrice } from "../../../../lib/utils/utils";
import { Product as ProductType } from "@/types";
import { Heart } from "lucide-react";
import Loading from "@/components/Loading";
import useFavoriteActions from "@/hooks/useFavoriteActions";

interface ProductProps{
  product: any;
  className?: string;
  isNewProduct?:boolean;
  isFavoriteDefault?:boolean;
}

const Product = ({
  product,
  className,
  isNewProduct,
}:ProductProps) => {
  const {
    id,
    name,
    collection,
    price,
    isFavorite,
    material,
    coverImage,
  } = product;

  const {
    addItemToFavoriteAction,
    removeItemFavoriteAction,
    isPending,
    isItemInFavorite,
  } = useFavoriteActions(isFavorite);

  const toggleFavorite = () => {
    if (isItemInFavorite) {
      removeItemFavoriteAction({ productId: id! });
    } else {
      addItemToFavoriteAction({ productId: id! });
    }
  };


  return (
    <article className={cn("snap-start relative rounded-md  flex-grow",className)}>
    <button
      disabled={isPending}
      className="absolute right-2 z-10 top-2 grid place-content-center bg-white border border-gray-200 rounded-full w-[30px] h-[30px]"
      onClick={toggleFavorite}
    >
      {isPending ? (
        <Loading size={18} />
      ) : (
        <Heart
          size={18}
          className={cn(isItemInFavorite && "fill-red-500 text-red-500")}
        />
      )}
    </button>
     {
      isNewProduct && (
        <p className=" absolute z-10 font-semibold text-xs animate-pulse left-4 top-4 bg-red-500 text-white rounded-md p-1">
        Nuevo!
      </p>
      )
     }
    <Link
      href={`/cases/${id}`}
      className={cn(
        "relative rounded-md flex flex-col justify-center items-center",
        className
      )}
    >
     <figure className="w-full m-auto h-[240px] relative flex justify-center">
          <Image
            src={coverImage || "/mock.phone.png"}
            className="h-full w-full rounded-md object-cover"
            alt="image cases"
            fill
          />
        </figure>

      <div className="px-5 grid place-content-center text-center mt-1">
        <p className="font-semibold text-sm capitalize tracking-wider">
          {name}
        </p>
        <p className="font-semibold text-xs capitalize">
          {collection?.name}
        </p>
        <p className="font-semibold text-xs capitalize">{material?.name}</p>
        <p className="font-medium text-sm">{formatPrice(price!)}</p>
      </div>
    </Link>
  </article>
  );
};

export default Product;
