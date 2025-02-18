import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMediaQuery } from "react-responsive";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";

interface ImageType {
  id: number;
  image: string;
}

interface SliderImagesProps {
  images: ImageType[];
}

const SliderImages: React.FC<SliderImagesProps> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [mainSwiper, setMainSwiper] = useState<any>(null);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <div className="absolute inset-0 px-4  max-w-screen-lg mx-auto flex gap-2 flex-col lg:flex-row items-start overflow-hidden">
      {/* Thumbnail Swiper */}
      <div className={`${isTabletOrMobile ? "order-1 w-full" : "order-none lg:w-[90px] lg:h-full"} flex-shrink-0`}>
        <Swiper
          onSwiper={setThumbsSwiper}
          direction={isTabletOrMobile ? "horizontal" : "vertical"}
          spaceBetween={10}
          slidesPerView={4}
          freeMode
          watchSlidesProgress
          modules={[Thumbs]}
          className="w-full h-[80px] lg:h-full border-r lg:border-b-0 border-b border-gray-300 rounded-2xl"
        >
          {images?.map(({ id, image }, index) => (
            <SwiperSlide key={id}>
              <img
                src={image}
                alt={`Thumbnail ${index}`}
                className="object-contain w-full h-full rounded-2xl cursor-pointer"
                onMouseEnter={() => mainSwiper?.slideTo(index)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="relative flex-1 max-h-[70%] h-full w-full lg:w-5/6 lg:max-h-full flex justify-center items-center bg-gray-200 rounded-3xl overflow-hidden">
=        <Swiper
          onSwiper={setMainSwiper}
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Navigation, Thumbs]}
          className="w-full h-full rounded-3xl"
        >
          {images?.map(({ id, image }, index) => (
            <SwiperSlide key={id} className="relative w-full h-full">
              <Image
                src={image}
                alt={`Main Image ${index + 1}`}
                layout="fill"
                className="object-contain rounded-2xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default SliderImages;
