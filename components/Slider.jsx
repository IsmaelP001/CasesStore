'use client'

import React, { useRef, useState } from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import SlideNextButton from './SlideNextButton';
import SlidePrevButton from './SlidePrevButton';
import 'swiper/swiper-bundle.css';



export default function Slider({slides,breakpoints, spaceBetween=10,title,titleSize='text-xl'}) {
  const [swiperRef, setSwiperRef] = useState(null);
  const [hovered, setHovered] = useState(false); // Estado para controlar si el mouse está sobre el slider
  const [currentSlideInfo,setCurrentSlideInfo]=useState({isBeginning:true,isEnd:false})

  // Create array with 10 slides
  // const slides = Array.from({ length: 10 }).map((_, index) => `Slide ${index + 1}`);

  const handleSlideChange = (swiper)=>{
     setCurrentSlideInfo({isBeginning:swiper.isBeginning,isEnd:swiper.isEnd,isAllSlideVisible:swiper.isBeginning && swiper.isEnd})
     console.log(swiper.isBeginning,swiper.isEnd)
  }

  

  return (
    <div className="relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
       {title && <h3 className={`${titleSize} font-semibold mb-5`}>{title}</h3>}
      <Swiper
        onSwiper={setSwiperRef}
        onSlideChange={handleSlideChange}
        slidesPerView={4}
        spaceBetween={spaceBetween}
        breakpoints={breakpoints}
        className='z-1'
      >
        {slides.map((slideContent, index) => {
           return <SwiperSlide key={index} virtualIndex={index} className='z-1'>
             {slideContent}
          </SwiperSlide>
        })}
        {
          hovered && (
            <div  className="absolute inset-0 flex items-center justify-between w-full z-1 ">
             <SlidePrevButton currentSlideInfo={currentSlideInfo}/>
             <SlideNextButton currentSlideInfo={currentSlideInfo}/>
            </div>
          )
        }
      </Swiper>
      
    </div>
  );
}

