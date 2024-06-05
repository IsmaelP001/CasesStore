'use client'
import { useEffect,useState } from 'react';
import Image from "next/image"
import Link from "next/link"

import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import SlideNextButton from '../../../components/SlideNextButton';
import SlidePrevButton from '../../../components/SlidePrevButton';
import 'swiper/swiper-bundle.css';
import { productLinks } from '../../../lib/utils/links';

export const CategoriesSlider = () => {


  const [swiperRef, setSwiperRef] = useState(null);
  const [hovered, setHovered] = useState(false); // Estado para controlar si el mouse está sobre el slider
  const [currentSlideInfo,setCurrentSlideInfo]=useState({isBeginning:true,isEnd:false})

  

  const breakpoints = {
    320: {
      slidesPerView: 3,
    },
    640: {
      slidesPerView: 4,
    },
    768: {
      slidesPerView: 5,
    },
    1024: {
      slidesPerView: 6,
    }
  }

  const handleSlideChange = (swiper)=>{
     setCurrentSlideInfo({isBeginning:swiper.isBeginning,isEnd:swiper.isEnd,isAllSlideVisible:swiper.isBeginning && swiper.isEnd})
     console.log(swiper.isBeginning,swiper.isEnd)
  }

  return (
    <div className="relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Swiper
        onSwiper={setSwiperRef}
        onSlideChange={handleSlideChange}
        slidesPerView={4}
        spaceBetween={20}
        breakpoints={breakpoints}
        className='w-full'
      >
        {productLinks.map((product, index) => {
           return <SwiperSlide key={index} virtualIndex={index}>
               <Link href={product.type} className='grid place-content-center'>
              <div className="text-center">
                 <div className="relative w-auto">
                  <Image width={100} height={100} src={product.image} alt={product.type} className="object-cover w-[100px] h-[100px]" />
                 </div>
                 <span className="font-semibold capitalize mt-2 text-sm">{product.type}</span>
              </div>
             </Link>
          </SwiperSlide>
        })}
        {
          hovered && (
            <div  className="absolute inset-0 flex items-center justify-between w-full ">
             <SlidePrevButton currentSlideInfo={currentSlideInfo}/>
             <SlideNextButton currentSlideInfo={currentSlideInfo}/>
            </div>
          )
        }
      </Swiper>
      
    </div>
  );
}
