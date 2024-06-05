import { useMemo } from "react"
import Slider from "../../../components/Slider"
import { featureLinks } from "../../../lib/utils/links"
import Link from "next/link"
import Image from "next/image"


const FeaturesSlider = () => {

    const sliderData=useMemo(()=>{
     return featureLinks.map(feature=>{
        return <div key={feature.title} className=" bg-base-200 px-4 pt-4 rounded-xl hover:scale-[102%] transition-all duration-500 hover:shadow-xl  ">
            <Link href={feature.link} className="space-y-2  ">
               {feature.isNew &&  <span className="text-red-600 text-sm font-semibold">Nuevo</span>}
              <h4 className="text-2xl font-semibold capitalize">{feature.title}</h4>
              <p className="text-md">
                {feature.content}
              </p>
              <figure>
                <Image width={300} height={300}  src={feature.image} alt={feature.title}  className='w-[250px] h-[200px] object-cover object-top m-auto'/>
              </figure>
            </Link>
        </div>
     })
    },[featureLinks])

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
     <Slider slides={sliderData} breakpoints={breakpoints} spaceBetween={20} width={250} title='Porque comprar con nosotros?' titleSize="text-3xl"></Slider>
   </>
  )
}

export default FeaturesSlider