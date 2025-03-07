

"use client";

import { ChevronLeft, ChevronRight, MoveLeft, MoveRight } from "lucide-react";
import React, { useRef, useEffect, useState, ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils/utils";

interface SliderProps {
  children: ReactNode;
  step?: number;
}

interface SliderContentProps {
  className?: string;
  children: ReactNode;
}

const SliderContent = forwardRef<HTMLDivElement, SliderContentProps>(
  ({ className, children }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-nowrap overflow-x-scroll scrollbar-hide snap-x snap-mandatory scroll-smooth space-x-3 md:space-x-8 lg:space-x-10",
          className
        )}
      >
        {children}
      </div>
    );
  }
);

SliderContent.displayName = "SliderContent"; 

const Slider: React.FC<SliderProps> = ({ children, step = 1 }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAtStart, setIsAtStart] = useState(false);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const handleScroll = () => {
    if (!ref.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = ref.current;

    setIsAtStart(scrollLeft <= 5);
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
  };

  useEffect(() => {
    if (!ref.current) return;
    const container = ref.current;

    container.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const updateSlidePosition = (index: number) => {
    if (ref.current && ref.current.firstElementChild) {
      const firstSlide = ref.current.firstElementChild as HTMLElement;
      const slideWidth = firstSlide.offsetWidth;
      ref.current.scrollTo({
        left: index * step * slideWidth,
        behavior: "smooth",
      });
    }
  };

  const nextSlide = () => {
    const newIndex = isAtEnd ? 0 : currentSlide + step;
    setCurrentSlide(newIndex);
    updateSlidePosition(newIndex);
  };

  const prevSlide = () => {
    const newIndex = !isAtStart ? currentSlide - step : null;
    if (newIndex !== null) {
      setCurrentSlide(newIndex);
      updateSlidePosition(newIndex);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);

    return () => clearInterval(interval);
  }, [currentSlide]); 

  return (
    <div className="relative w-full pb-10">
      <div className="absolute z-20 right-0  -bottom-5 flex justify-end pb-1 px-1">
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className={cn(
              "border border-[#CCCACA] grid place-content-center rounded-2xl px-6 py-2 z-10 ",
              isAtStart && "bg-gray-200"
            )}
          >
            <MoveLeft className="size-[20px]" />
          </button>
          <button
            onClick={nextSlide}
            className={cn(
              "border border-[#CCCACA] rounded-2xl px-6 py-2 z-10 grid place-content-center bg-foreground text-white",
            )}
          >
            <MoveRight className="size-[20px]" />
          </button>
        </div>
      </div>

      {/* Slider content */}
      {React.cloneElement(children as React.ReactElement, { ref })}
    </div>
  );
};

export { Slider, SliderContent };



export default Slider;
