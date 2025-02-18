
import { cn } from "@/lib/utils/utils";
import Image from "next/image";
import Link from "next/link";
import { serverHelpers } from "@/lib/trpc/serverHelper";
const COLORS_COLLECTIONS: { [key: number]: string } = {
  0: "bg-yellow-500/50",
  5: "bg-green-500/50",
};



const CollectionsList =async () => {
  const collections =await serverHelpers.catalog.getCollections.fetch()

  return (
    <div>
      <h2 className="bebas-neue quicksand tracking-wide text-center text-balance !leading-tight font-bold  text-3xl md:text-4xl text-gray-900">
        <span className="text-accent">Colecciones</span> recientes
      </h2>
      <section className="py-5 grid grid-cols-2  md:grid-cols-4 gap-4">
        {collections?.map(({ id, name, image, products_count }, index) => {
          const spanClass = [0, 5].includes(index)
            ? " md:col-span-2 rounded-xl"
            : "bg-gray-100 rounded-xk";
          return (
            <article
              key={id}
              className={cn(spanClass, COLORS_COLLECTIONS[index])}
            >
              <Link href={`/cases?collection=${name}`}>
                <div className="grid grid-cols-[1fr_auto]  px-1.5 pt-2 min-w-[200px]">
                  <div className="flex items-center justify-center">
                    <p className="p-3 text-black capitalize text-wrap text-sm md:text-base font-semibold text-center">
                      {name}
                    </p>
                    <p className="font-light tracking-tight text-sm md:text-base">
                      {products_count}
                    </p>
                  </div>
                  <div className="relative h-[80px] w-[80px] rounded-xl">
                    <Image
                      fill
                      className="w-[150px] h-[150px] object-contain rounded-xl"
                      alt={name}
                      src={image || "/IA.SVG"}
                    />
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default CollectionsList;
