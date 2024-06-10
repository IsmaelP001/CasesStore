'use client'

import React, { useRef, useState } from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import SlideNextButton from '../SlideNextButton';
import SlidePrevButton from '../SlidePrevButton';
import 'swiper/swiper-bundle.css';
import { useQuery } from '@tanstack/react-query';
import {getCollections} from '../../app/(store)/_lib/data'
import Link from 'next/link';
import Image from 'next/image';


export default function CollectionsSlider({slides,breakpoints, spaceBetween=10,title,titleSize='text-xl'}) {
  const [swiperRef, setSwiperRef] = useState(null);
  const [hovered, setHovered] = useState(false); // Estado para controlar si el mouse está sobre el slider
  const [currentSlideInfo,setCurrentSlideInfo]=useState({isBeginning:true,isEnd:false})
  const {data:collections=[],isPending}=useQuery({
    queryKey:['collections'],
    queryFn:getCollections
  })
  // Create array with 10 slides
  // const slides = Array.from({ length: 10 }).map((_, index) => `Slide ${index + 1}`);

  const handleSlideChange = (swiper)=>{
     setCurrentSlideInfo({isBeginning:swiper.isBeginning,isEnd:swiper.isEnd,isAllSlideVisible:swiper.isBeginning && swiper.isEnd})
     console.log(swiper.isBeginning,swiper.isEnd)
  }


  return (
    <div className="relative " onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
       <h3 className='text-3xl mb-3 font-semibold text-center'>Explora nuestras colecciones</h3>
      <Swiper
        onSwiper={setSwiperRef}
        onSlideChange={handleSlideChange}
        slidesPerView={4}
        spaceBetween={spaceBetween}
        breakpoints={breakpoints}
      >
        {collections?.map(({id,name,image}) => {
           return <SwiperSlide key={id} virtualIndex={id}>
             <Link href={`/cases?collection=${name}`}>
               <div className='relative'>
                 <Image width={150} height={150} className='w-[150px] h-[150px] object-cover' alt={name}  src={image}></Image>
               </div>
               <p className='absolute left-0 right-0 bottom-0 p-3 bg-slate-700/50 capitalize text-xl font-medium text-white tracking-widest text-center'>{name}</p>
             </Link>
          </SwiperSlide>
        })}
        {
          hovered && collections.length > 4 &&(
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

