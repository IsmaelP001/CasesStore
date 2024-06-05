'use client'

import React, { useRef, useState } from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import SlideNextButton from '../SlideNextButton';
import SlidePrevButton from '../SlidePrevButton';
import 'swiper/swiper-bundle.css';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '../../lib/data/products';
import Product from '../../app/(store)/cases/_components/Product'


export default function CollectionsSlider({slides,breakpoints, spaceBetween=10,title,titleSize='text-xl'}) {
  const [swiperRef, setSwiperRef] = useState(null);
  const [hovered, setHovered] = useState(false); // Estado para controlar si el mouse está sobre el slider
  const [currentSlideInfo,setCurrentSlideInfo]=useState({isBeginning:true,isEnd:false})
  const {data:favorites=[],isPending}=useQuery({
    queryKey:['products'],
    queryFn:()=>getProducts('iphone')
  })
  // Create array with 10 slides
  // const slides = Array.from({ length: 10 }).map((_, index) => `Slide ${index + 1}`);

  const handleSlideChange = (swiper)=>{
     setCurrentSlideInfo({isBeginning:swiper.isBeginning,isEnd:swiper.isEnd,isAllSlideVisible:swiper.isBeginning && swiper.isEnd})
     console.log(swiper.isBeginning,swiper.isEnd)
  }

  console.log('favoritos',favorites)


  return (
    <div className="relative " onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
       <h3 className='text-3xl mb-3 font-semibold text-center'>Favoritos de nuestros clientes</h3>
      <Swiper
        onSwiper={setSwiperRef}
        onSlideChange={handleSlideChange}
        slidesPerView={3}
        spaceBetween={spaceBetween}
        breakpoints={breakpoints}
      >
        {favorites?.map((product) => {
           return <SwiperSlide key={product.id} virtualIndex={product.id} className='w-50' >
            <Product  {...product} ></Product>
          </SwiperSlide>
        })}
        {
          hovered && favorites.length > 4 &&(
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

