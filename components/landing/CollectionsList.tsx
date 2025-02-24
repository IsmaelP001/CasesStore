import { cn } from "@/lib/utils/utils";
import Image from "next/image";
import Link from "next/link";
import { serverHelpers } from "@/lib/trpc/serverHelper";

const CollectionsList = async () => {
  const collections = await serverHelpers.catalog.getCollections.fetch({limit:8});

  return (
    <div>
      <h2 className="sedgwick_ave font-semibold text-3xl md:text-4xl   text-gray-900">
        <span className="text-accent">Colecciones</span> recientes
      </h2>

      <section
        className="py-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4
          auto-rows-[50px] md:auto-rows-[50px] lg:auto-rows-[70px]
          gap-2 grid-flow-row-dense "
      >
        {collections?.map(({ id, name, image, products_count }, index) => {
          const spanClass =
            index % 6 === 0
              ? "col-span-2 row-span-2"
              : index % 5 === 0
              ? "col-span-1 row-span-2"
              : index % 4 === 0
              ? "col-span-1 row-span-2"
              : "col-span-1 row-span-1";

          return (
            <article
              key={id}
              className={cn(
                " rounded-md bg-gray-400  flex flex-col justify-center items-center",
                spanClass
              )}
            >
              <Link
                className="relative  w-full h-full"
                href={`/cases?collection=${name}`}
              >
                <div className="absolute bottom-0 left-0 w-fit h-fit p-2 md:p-3 z-10 text-white quicksand">
                  <p className="capitalize text-sm md:text-xl font-bold">
                    {name}
                  </p>
                  <p className="font-light text-sm md:text-base space-x-2">
                    <span>{products_count}</span><span>Articulos</span>
                  </p>
                </div>
                <Image
                  src={image || ""}
                  alt="Descripción de la imagen"
                  fill
                  className="object-cover w-[50px] rounded-md brightness-75"
                />
              </Link>
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default CollectionsList;
