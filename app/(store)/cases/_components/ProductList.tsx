'use client'
import { trpc } from '@/lib/trpc/client';
import React from 'react'
import Product from './Product';
import { SearchParams } from '@/types';

const ProductList = ({searchParams}:{searchParams:SearchParams}) => {
    const [products] =
    trpc.catalog.getProducts.useSuspenseQuery(searchParams);

  return (
    <div>
         {products?.length ? (
            <div className="grid gap-5 place-items-center grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
              {products?.map((product: any) => (
                <Product key={product.id} product={product}></Product>
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
  )
}

export default ProductList