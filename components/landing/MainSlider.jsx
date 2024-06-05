import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
import Image from 'next/image';
import { Button } from '../ui/button';

export default function App() {
  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mt-5"
      >
            <SwiperSlide className='relative max-w-[90vw] max-h-[90vh]'>
          <div className='relative w-[90vw] h-[90vh]'>
             <Image fill className='object-cover' src='https://i0.wp.com/senpai.com.mx/wp-content/uploads/2019/12/naruto-shippuuden-shonen-jump-monkey-d-luffy-son-goku-wallpaper-preview.jpg?fit=728%2C410&ssl=1' />
          </div>
          <div className='absolute inset-0 bg-gray-200/75'/>
          <div className='absolute inset-0 p-5 flex items-center ml-10'>
            <div className=' p-5 w-fit rounded-xl'>
              <h2 className='text-7xl mb-2 font-black'>Amplio catalogo de colecciones</h2>
              <p className='text-2xl  tracking-wider'>Los personajes que amas, siempre contigo</p>
              <Button variant="outline" className='mt-2 text-primary'>Explorar colecciones</Button>
            </div>
          </div>

        </SwiperSlide>
        <SwiperSlide className='relative max-w-[90vw] max-h-[90vh]'>
          <div className='relative w-[90vw] h-[90vh]'>
             <Image fill className='object-cover' src='https://casetology.in/cdn/shop/files/O1CN011oE3Lf1b0chK3mP1x__2212010643403.jpg?v=1697278111&width=1000' />
          </div>
          <div className='absolute inset-0 bg-gray-200/75'/>
          <div className='absolute inset-0 p-5 flex items-center justify-around'>
            <div>
              <h2 className='text-7xl mb-2  font-bold '>Envio gratis</h2>
              <p className='text-2xl'>A partir de: <span className=' font-medium'>RD 900 pesos</span></p>
              <Button variant="outline" className='mt-2'>Ver productos</Button>
            </div>

            <div>
            </div>
          </div>

        </SwiperSlide>
    
        <SwiperSlide className='max-w-[90vw] max-h-[90vh]'>
           <img className='w-full h-full object-cover' src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
        <SwiperSlide className='max-w-[90vw] max-h-[90vh]'>
           <img className='w-full h-full object-cover' src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
    
      </Swiper>
    </>
  );
}
