"use client";

import React, { ReactNode, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SlideNextButton from "./SlideNextButton";
import SlidePrevButton from "./SlidePrevButton";
import "swiper/swiper-bundle.css";
import { cn } from "@/lib/utils/utils";

export function Slider({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

export function SliderTitle({
  children,
  className,
}: {
  children: ReactNode | string;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "order-1 tracking-tight text-balance !leading-tight font-bold md:text-3xl text-gray-900 text-xl",
        className
      )}
    >
      {children}
    </h2>
  );
}

interface Slider {
  children: ReactNode;
  breakpoints?: Record<string, any>;
  className?: string;
  spaceBetween?: number;
}

export default function SliderContent({
  children,
  breakpoints,
  spaceBetween = 10,
  className,
}: Slider) {
  const [swiperRef, setSwiperRef] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [currentSlideInfo, setCurrentSlideInfo] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const handleSlideChange = (swiper: any) => {
    setCurrentSlideInfo({
      isBeginning: swiper.isBeginning,
      isEnd: swiper.isEnd,
    });
  };

  const defaultBreakpoints = {
    0: {
      slidesPerView: 2,
      spaceBetween: 2,
    },
    350: {
      slidesPerView: 2,
      spaceBetween: 2,
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    1280: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
  };

  return (
    <Swiper
      onSwiper={setSwiperRef as any}
      onSlideChange={handleSlideChange}
      slidesPerView={4} 
      spaceBetween={spaceBetween} 
      autoplay={{
        delay: 500,
        disableOnInteraction: true,
      }}
      loop={true}
      breakpoints={{ ...defaultBreakpoints, ...breakpoints }} 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn("relative", className)}
    >
      {children}
      {hovered && (
        <div className="absolute inset-0 flex items-center justify-between w-full ">
          <SlidePrevButton currentSlideInfo={currentSlideInfo} />
          <SlideNextButton currentSlideInfo={currentSlideInfo} />
        </div>
      )}
    </Swiper>
  );
}

export function SlideItem({ children }: { children: ReactNode }) {
  return <SwiperSlide>{children}</SwiperSlide>;
}
