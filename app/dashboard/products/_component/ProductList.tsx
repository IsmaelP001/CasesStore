'use client'
import React, { lazy } from 'react'
import Image from 'next/image'
import DialogDeleteProduct from './DialogDeleteProduct'
import { trpc } from '@/lib/trpc/client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
const CreateProductSidebar =  lazy(()=>import('./CreateProductSidebar'))

const ProductList = () => {
  const [products]= trpc.catalog.getProducts.useSuspenseQuery(undefined,{
    refetchOnMount:false,
    refetchOnWindowFocus:false
  })

  
  return (
    <div className='mt-5 space-y-3 w-full px-5'>
      <header className="flex items-start justify-between mb-10">
        <h2 className="text-4xl font-bold mb-10">Todos los productos</h2>
        <CreateProductSidebar/>
      </header>
      
      <Table>
        <TableCaption>Una lista de todos los productos disponibles.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Colección</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead className="text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map(({ id, name, price, collection, coverImage }) => (
            <TableRow key={id}>
              <TableCell>
                <Image
                  width={50}
                  height={50}
                  src={coverImage!}
                  alt={`imagen de ${name}`}
                  className="object-cover rounded-md"
                />
              </TableCell>
              <TableCell className="font-medium">{name}</TableCell>
              <TableCell>{collection?.name || 'Sin colección'}</TableCell>
              <TableCell>{price}</TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <DialogDeleteProduct id={id!} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="text-right font-medium">
              Total de productos: {products?.length || 0}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

export default ProductList
