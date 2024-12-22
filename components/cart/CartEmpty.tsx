'use client'

import Image from "next/image"

const CartEmpty = () => {
  return (
    <div className="p-10 mt-10 px-8 text-center space-y-3">
      <figure>
        <Image 
        alt="empty cart image"
        width={150}
        height={150}
        src='/images/empty-cart.svg'
        sizes="100vw"
        className="w-[150px] h-auto m-auto"
        />
      </figure>
        <p className="font-sm font-light px-10">No tienes articulos en el carrito</p>
    </div>
  )
}

export default CartEmpty