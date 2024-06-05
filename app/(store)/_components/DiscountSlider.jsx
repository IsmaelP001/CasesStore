import { useMemo } from "react"
import Slider from "../../../components/Slider"
import { discountLinks } from "../../../lib/utils/links"
import Link from "next/link"
import Image from "next/image"


const DiscountSlider = () => {

    const sliderData=useMemo(()=>{
     return discountLinks.map(product=>{
        return <div key={product.type} className="card bg-slate-50 ">
            <Link href={product.link} className="space-y-2 p-5">
                <div className="flex justify-between">
                 <span className="text-red-600 text-sm font-semibold">Nuevo</span>
                 <span className="text-red-600 text-sm">{product.discountPorcentage}</span>
                </div>
              <h4 className="text-3xl font-light capitalize">{product.type}</h4>
              <div className="gap-2 ">
                <p className="flex">antes: <span className="font-semibold ">{product.regularPrice}</span></p>
                <p>Ahora: <span className="font-semibold ">{product.discountPrice}</span></p>
              </div>
              <figure>
                <Image with={300} heigh={300}  src={product.image} alt={product.type}  className='w-[200px] h-[200px] object-cover'/>
              </figure>
            </Link>
        </div>
     }) || []
    },[discountLinks])

    const breakpoints={
        0:{
            slidesPerView: 2,
        },
        320:{
          slidesPerView: 2,
        },
        640: { // Breakpoint para dispositivos con ancho de pantalla de al menos 640px
          slidesPerView: 2,
        },
        768: { // Breakpoint para dispositivos con ancho de pantalla de al menos 768px
          slidesPerView: 2,
        },
        1024: { // Breakpoint para dispositivos con ancho de pantalla de al menos 1024px
          slidesPerView: 3,
        }
      }

  return (
   <>
     <Slider slides={sliderData} breakpoints={breakpoints} title='Descuentos especiales' titleSize="text-3xl"></Slider>
   </>
  )
}

export default DiscountSlider