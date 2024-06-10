"use client";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { addCartItem } from "../../../../lib/actions/cart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getProducts } from "../../../../lib/data/products";
import Product from "./Product";
import { usePathname, useSearchParams } from "next/navigation";
import FilterParams from "./FilterParams";
import FilterProducts from "./FilterProducts";

const ProductPage = ({ params, searchParams }) => {
  const [id] = params.id || [];

  const pathname = usePathname();


  const { collection, pattern, material, color } = searchParams;

  const {
    data: products,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["cases", collection, pattern, material, color,id],
    queryFn: async () => {
      const data = await getProducts(id, searchParams);
      return data;
    },
  });


  return (
    <div className="space-y-5 px-10">
      {products?.length >0 && !pathname.endsWith('cases')? (
        <h2 className="text-3xl font-semibold">Fundas para <span className="capitalize">{pathname.split('/').slice(-1).join()}</span></h2>
      ):
      <h2 className="text-3xl font-semibold">Todos los dispositivos</h2>
      }
      <div className="flex gap-5">
        <FilterProducts  />
        <div className="flex-1">
          <FilterParams searchParams={searchParams}/>
          {products?.length > 0 ? (
            <div className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
              {products?.map((product) => (
                <Product key={product.id} {...product}></Product>
              ))}
            </div>
          ) : (
            <div className="min-h-screen w-full flex ">
              <h2 className="text-xl font-semibold mt-5 ml-5">
                Resultados no encontrados...
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
