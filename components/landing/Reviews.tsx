"use client";

import { HTMLAttributes, useEffect, useRef, useState } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Phone from "@/app/(store)/_components/Phone";
import { cn } from "@/lib/utils/utils";

const PHONES = [
  "/cartoons/cartoon-1.jpeg",
  "/cartoons/cartoon-2.avif",
  "/cartoons/cartoon-11.png",

  "/cartoons/cartoon-3.avif",
  "/cartoons/cartoon-12.jpg",

  "/cartoons/cartoon-4.avif",
  "/cartoons/cartoon-14.webp",

  "/cartoons/cartoon-5.jpeg",
  "/cartoons/cartoon-6.png",
  "/cartoons/cartoon-15.webp",

  "/cartoons/cartoon-7.avif",
  "/cartoons/cartoon-8.png",
  "/cartoons/cartoon-9.jpg",
  "/cartoons/cartoon-10.jpg",
  "/cartoons/cartoon-13.jpg",
];

function splitArray<T>(array: Array<T>, numParts: number) {
  const result: Array<Array<T>> = [];

  for (let i = 0; i < array.length; i++) {
    const index = i % numParts;
    if (!result[index]) {
      result[index] = [];
    }
    result[index].push(array[i]);
  }

  return result;
}

function ReviewColumn({
  reviews,
  className,
  reviewClassName,
  msPerPixel = 0,
}: {
  reviews: string[];
  className?: string;
  reviewClassName?: (reviewIndex: number) => string;
  msPerPixel?: number;
}) {
  const columnRef = useRef<HTMLDivElement | null>(null);
  const [columnHeight, setColumnHeight] = useState(0);
  const duration = `${2500 * msPerPixel}ms`;

  return (
    <div className="flex  flex-col overflow-hidden h-full">
      <div
        ref={columnRef}
        className={cn("animate-marquee space-y-8 py-4", className)}
        style={
          {
            "--marquee-duration": duration,
            animation: `marquee ${duration} linear infinite`,
          } as React.CSSProperties
        }
      >
        {reviews.concat(reviews).map((imgSrc, reviewIndex) => (
          <Review
            key={reviewIndex}
            className={reviewClassName?.(reviewIndex % reviews.length)}
            imgSrc={imgSrc}
          />
        ))}
      </div>
    </div>
  );
}

interface ReviewProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
}

function Review({ imgSrc, className, ...props }: ReviewProps) {
  const POSSIBLE_ANIMATION_DELAYS = [
    "0s",
    "0.1s",
    "0.2s",
    "0.3s",
    "0.4s",
    "0.5s",
  ];

  const animationDelay =
    POSSIBLE_ANIMATION_DELAYS[
      Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)
    ];

  return (
    <div
      className={cn(
        "animate-fade-in rounded-[2.25rem] px-1 shadow-xl shadow-slate-900/5",
        className
      )}
      style={{ animationDelay }}
      {...props}
    >
      <Phone imgSrc={imgSrc || "/placeholder-phone.jpg"} />
    </div>
  );
}

function ReviewGrid() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const columns = splitArray(PHONES, 3);
  const column1 = columns[0];
  const column2 = columns[1];
  const column3 = splitArray(columns[2], 2);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative -mx-4 grid h-[40svh] md:h-[75svh] grid-cols-2 items-start gap-8 overflow-hidden px-4 md:grid-cols-2 lg:grid-cols-2 "
      )}
    >
      <ReviewColumn
        reviews={[...column1, ...column3.flat(), ...column2]}
        reviewClassName={(reviewIndex) =>
          cn({
            "md:hidden": reviewIndex >= column1.length + column3[0].length,
            "lg:hidden": reviewIndex >= column1.length,
          })
        }
        msPerPixel={18}
      />
      <ReviewColumn reviews={[...column2, ...column3[1]]} msPerPixel={15} />
      {/* <ReviewColumn
            reviews={column3.flat()}
            msPerPixel={10}
          /> */}

      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-slate-100" />
      <div className="pointer-events-none absolute bottom-0 right-0 left-0 h-32 bg-gradient-to-t from-slate-100" />
    </div>
  );
}

export function Reviews() {
  return (
    <div className="relative">
      <ReviewGrid />
    </div>
  );
}
