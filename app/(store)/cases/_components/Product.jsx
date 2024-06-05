import Image from "next/image";
import Link from "next/link";
import { cn, formatPrice } from "../../../../lib/utils/utils";

const Product = ({ id,name, price, productImages,printPattern,materials,collections,className }) => {
  return (
    <Link  href={`/product/${id}`} className={cn(' rounded-xl flex flex-col justify-center items-center rounded-xl" href={`/product/${id}',className)}>
      <div className="relative w-[200px] h-[200px] ">
        <Image
          className="object-cover m-auto"
          src={productImages?.image}
          fill
          alt="image"
        ></Image>
      </div>
      <div className="px-5 grid place-content-center text-center py-3">
        <p className="font-semibold text-sm capitalize tracking-wider">{name}</p>
        <p className="font-semibold text-xs capitalize">{collections?.name}</p>
        <p className="font-semibold text-sm tracking-wider"> {formatPrice(price)}</p>
      </div>
    </Link>
  );
};

export default Product;
