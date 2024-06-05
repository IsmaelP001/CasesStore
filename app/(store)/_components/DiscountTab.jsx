'use client'
import React, { useMemo, useState } from 'react';
import Slider from '../../../components/Slider';
import { discountLinksTab, tabsName } from "../../../lib/utils/links";
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../../../components/ui/button';

const DiscountTab = () => {
    const [currentTab, setCurrentTab] = useState(0);

    const handleTabClick = (tabId) => {
        setCurrentTab(tabId);
    };

    const sliderData = useMemo(() => {
        return discountLinksTab[currentTab]?.map(product => (
            <div key={product.type} className="hover:scale-[101%] transition-all duration-500 hover:shadow-md">
                <Link href={product.link} className="space-y-2 p-5">
                    <div className="flex justify-between">
                        <span className="text-red-600 text-sm font-semibold">Nuevo</span>
                        <span className="text-red-600 text-sm">{product.discountPorcentage}</span>
                    </div>
                    <h4 className="text-3xl font-light capitalize">{product.type}</h4>
                    <div className="gap-2">
                        <p className="flex">antes: <span className="font-semibold ">{product.regularPrice}</span></p>
                        <p>Ahora: <span className="font-semibold ">{product.discountPrice}</span></p>
                    </div>
                    <figure>
                        <Image width={100} height={100} src={product.image} alt={product.type} className='w-[100px] h-[100px] object-cover'/>
                    </figure>
                </Link>
            </div>
        )) || []
    }, [currentTab]);

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
        },
        1320: { // Breakpoint para dispositivos con ancho de pantalla de al menos 1024px
            slidesPerView: 4,
        }
      }


    return (
        <div className='w-full'>
                        <h2 className='text-3xl mb-5 font-semibold'>Aprovecha nuestras ofertas</h2>
            <div className='flex justify-between rounded-md'>
                {
                     tabsName.map((tab,index) => (
                        <Button
                            key={index}
                            className={`btn ${currentTab === index ? 'btn-outline rounded-t-md border-b-primary' : ' bg-transparent text-primary  '} flex-1 btn-sm p-1 rounded-none border-b-2 border-b-neutral hover:bg-primary`}
                            onClick={() => handleTabClick(index)}
                        >
                          <span className='text-xs md:text-base'>{tab.type}</span>
                        </Button>
                    ))
                }
            </div>
            <div className='min-h-20 p-5 bg-base-200 rounded-sm'>
                {sliderData.length === 0 ? <span className='mt-10 '>No hay resultados en esta categoria...</span> : null}
                <Slider slides={sliderData} breakpoints={breakpoints} />
            </div>
        </div>
    );
};

export default DiscountTab;
