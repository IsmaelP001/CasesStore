"use client";
import {  ChevronRight, Smartphone } from "lucide-react";
import Link from "next/link";
import React, { useRef } from "react";

interface DeviceSliderProps {
  devices: any[];
}
export default function DeviceSlider({ devices }: DeviceSliderProps) {
  const ref = useRef<HTMLUListElement | null>(null);

  const nextSlide = () => {
    if (ref.current) {
      const { scrollLeft, clientWidth, scrollWidth } = ref.current;
      const isEnd = scrollLeft + clientWidth >= scrollWidth - 5;
      if (isEnd) {
        ref.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        ref.current.scrollBy({ left: 200, behavior: "smooth" });
      }
    }
  };


  return (
    <div className="relative">
      <ul
        ref={ref}
        className="flex gap-2 snap-x snap-mandatory overflow-x-scroll scrollbar-hide "
      >
        {devices?.map((device) => (
          <li key={device?.id} className="snap-start">
            <Link
              href={`/cases?device=${device?.name}`}
              className="flex gap-1 text-nowrap items-center quicksand font-medium text-sm bg-gray-200 py-2 px-7 z-30 rounded-3xl w-fit"
            >
              <Smartphone size={20} />
              <p>{device?.name}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="absolute  right-0 top-[50%]  -translate-y-[50%] w-[90px] md:w-[180px] h-[50px] from-transparent to-background  bg-gradient-to-r"/>
      <button onClick={nextSlide} className="absolute   right-0 top-[50%] border border-gray-200 -translate-y-[50%] p-3 rounded-full bg-white">
        <ChevronRight/>
      </button>
    </div>
  );
}
