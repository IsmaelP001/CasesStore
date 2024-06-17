import Image from "next/image";
import { getProducts } from "../../../lib/data/products";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";

const Page = async () => {
  const data = await getProducts();
  console.log("data", data);
  return (
    <div className='mt-5 px-5'>
      <header className="flex items-start justify-between mb-10">
        <h2 className="text-4xl font-bold mb-10">Todos los productos</h2>
        <Button asChild>
        <Link href='/dashboard/products/create'>Nuevo producto</Link>
        </Button>
      </header>
      <div className=" grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-5">
        {data?.map(
          ({
            id,
            name,
            price,
            stock,
            isConfigurable,
            printPattern,
            devices,
            productImages,
            collections,
            materials,
            colors,
          }) => (
            <article key={id} className=" bg-slate-100 rounded-md">
              <figure className="relative w-full h-32 ">
                <Image
                  layout="fill"
                  src={productImages?.image}
                  alt={`imagen de ${name}`}
                  className="object-cover rounded-t-md"
                ></Image>
              </figure>
              <div>
                <div className='text-center'>
                  <p className="text-sm font-semibold">{name}</p>
                  <p className="text-xs font-medium">{printPattern?.name}</p>
                  <p className="text-xs font-medium">{collections?.name}</p>
                  <p className="text-xs font-medium">{materials?.name}</p>
                  <p className="text-sm font-semibold">{price}</p>
                  <div className='flex px-0.5 pb-2 gap-1 justify-center'>
                  <Button size="icon" variant="link" className="h-6 text-xs" asChild>
                    <Link href={`/dashboard/products/edit?id=${id}`}>
                     <MdEditSquare  className="text-2xl text-blue-600"/>
                    </Link>
                  </Button>

                    <Button size="icon" variant="link" className="h-6 text-xs ">
                      <MdDelete className="text-2xl text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          )
        )}
      </div>
    </div>
  );
};

export default Page;
