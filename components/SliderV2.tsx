"use client";

import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

export default function SliderV2({books}:{books:any[]}) {


    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500
      };


  return (
    <div>
      <Slider {...settings}>
        {books?.map((book, index) => (
          <article key={index}>
            <div
              className={`relative w-[150px] bg-red-200 h-[150px] duration-500 mx-2 rounded-lg z-10`}
            >
              <Image
                className="rounded-xl object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                fill
                src={book?.coverImage}
                alt={`image-for-${book.title}`}
              ></Image>
            </div>
          </article>
        ))}
      </Slider>
    </div>
  );
}
