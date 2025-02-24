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
    <div className="absolute inset-0 md:px-4  max-w-screen-lg mx-auto md:h-[65svh] flex gap-2 flex-col lg:flex-row items-start overflow-hidden">
      {/* Thumbnail Swiper */}
      <div className={`${isTabletOrMobile ? "order-1 min-w-[50svw] m-auto justify-center" : "lg:w-[90px] lg:h-full"} flex-shrink-0`}>
        <Swiper
          onSwiper={setThumbsSwiper}
          direction={isTabletOrMobile ? "horizontal" : "vertical"}
          spaceBetween={10}
          slidesPerView={4}
          freeMode
          watchSlidesProgress
          modules={[Thumbs]}
          className="w-full h-[50px] md:h-[80px] lg:h-full md:rounded-2xl"
        >
          {images?.map(({ id, image }, index) => (
            <SwiperSlide key={id}>
              <img
                src={image}
                alt={`Thumbnail ${index}`}
                className="object-contain w-full h-full rounded-sm cursor-pointer"
                onMouseEnter={() => mainSwiper?.slideTo(index)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="relative flex-1 h-fit md:max-h-[70dvh] md:h-full w-full lg:w-5/6 lg:max-h-full flex justify-center items-center bg-gray-200 md:rounded-2xl overflow-hidden">
      <Swiper
          onSwiper={setMainSwiper}
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Navigation, Thumbs]}
          className="w-full h-full md:rounded-3xl"
        >
          {images?.map(({ id, image }, index) => (
            <SwiperSlide key={id} className="relative w-full h-full">
              <Image
                src={image}
                alt={`Main Image ${index + 1}`}
                layout="fill"
                className="object-contain md:rounded-2xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}





export default SliderImages;
