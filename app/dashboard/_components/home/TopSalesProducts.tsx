'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { trpc } from '@/lib/trpc/client'
import Image from 'next/image'
import React from 'react'

export default function TopSalesProducts() {
    const [topSalesProducts]=trpc.catalog.getTopSalesProducts.useSuspenseQuery(undefined,{
        refetchOnMount:false,
        refetchOnWindowFocus:false
    })
  return (
    <Card className="w-full bg-inherit shadow-none border-none " >
    <CardHeader>
      <CardTitle
      > Productos mas vendidos</CardTitle>
    </CardHeader>
    <CardContent >
      
    <div>
        {topSalesProducts.map((product) => (
          <article
            className="flex justify-between hover:shadow-sm hover:bg-white p-2 gap-5 text-sm rounded-md items-center"
            key={product.id}
          >
            <div className="flex gap-2 items-center">
              <figure className="bg-white rounded-md p-2">
                <Image
                  className="w-[30px] h-[30px]"
                  width={50}
                  height={50}
                  src={product.coverImage!}
                  alt={`product-${product.name}`}
                />
              </figure>
              <p className="font-medium">{product.name}</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <p className="p-2 rounded-md bg-gray-100 ">
                $<span className="font-medium">{product.price}</span>/item
              </p>
              <p><span className="font-medium">{product.count}</span> ventidos</p>
            </div>
          </article>
        ))}
      </div>
    </CardContent>
  </Card>  )
}
