'use client'
import { useSwiper } from "swiper/react";
import { GrFormNext } from "react-icons/gr";


const SlidePrevButton= ({currentSlideInfo})=>{
    const swiper = useSwiper();

    if(currentSlideInfo.isEnd ){
        return
    }

    return (
      <button className="btn btn-circle opacity-70 btn-neutral grid place-content-center p-5 z-[999] absolute right-0" onClick={()=>swiper.slideNext()}>
         <GrFormNext className="text-5xl"/>
      </button>
    )
  }

export default SlidePrevButton