import Phone from '@/app/(store)/_components/Phone'
import React from 'react'
import { FaArrowRight, FaCheck } from 'react-icons/fa6'
import { Button } from '../ui/button'
import Link from 'next/link'
import MaxWidthWrapper from '../MaxWidthWrapper'

const CustomCaseLayer = () => {
  return (
    <section>
    <MaxWidthWrapper className="">
      <div className="mb-6 px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="order-1 sedgwick_ave text-3xl md:text-4xl lg:text-5xl text-center text-balance !leading-tight font-bold  text-gray-900">
            Diseña tu funda{" "}
            <span className="text-accent">
              exclusiva
            </span>
            : solo sube tu foto
          </h2>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 lg:px-8 flex flex-col md:grid md:grid-cols-3 gap-5 md:gap-10">
        <div className=" col-span-2 flex items-center gap-5 md:gap-10 justify-center md:justify-end  ">
          <div className=" h-[250px] md:h-[320px] w-[200px]   rounded-xl bg-gray-900/5 ring-inset ring-gray-900/10 lg:rounded-2xl">
            <img
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0fac42de-c74e-4ac8-a1f0-fdc7dfcd7cf0/dg6guzf-1008c9fa-8793-4b33-a553-6c26acace6fc.jpg/v1/fill/w_1920,h_3400,q_75,strp/naruto_fanart_portrait_by_zlatanovitch_dg6guzf-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzBmYWM0MmRlLWM3NGUtNGFjOC1hMWYwLWZkYzdkZmNkN2NmMFwvZGc2Z3V6Zi0xMDA4YzlmYS04NzkzLTRiMzMtYTU1My02YzI2YWNhY2U2ZmMuanBnIiwiaGVpZ2h0IjoiPD0zNDAwIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uud2F0ZXJtYXJrIl0sIndtayI6eyJwYXRoIjoiXC93bVwvMGZhYzQyZGUtYzc0ZS00YWM4LWExZjAtZmRjN2RmY2Q3Y2YwXC96bGF0YW5vdml0Y2gtNC5wbmciLCJvcGFjaXR5Ijo5NSwicHJvcG9ydGlvbnMiOjAuNDUsImdyYXZpdHkiOiJjZW50ZXIifX0.IWx0RZcUpevOs1lhL3MjJS2XINUVpPtgRHzkuTec_Ko"
              className="rounded-md object-cover bg-white shadow-2xl ring-1 ring-gray-900/10 h-full w-full"
            />
          </div>

          <img src="/arrow.png" className=" w-[50px] md:w-[80px] " />

          <Phone
            className=" w-28 md:w-36"
            imgSrc="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0fac42de-c74e-4ac8-a1f0-fdc7dfcd7cf0/dg6guzf-1008c9fa-8793-4b33-a553-6c26acace6fc.jpg/v1/fill/w_1920,h_3400,q_75,strp/naruto_fanart_portrait_by_zlatanovitch_dg6guzf-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzBmYWM0MmRlLWM3NGUtNGFjOC1hMWYwLWZkYzdkZmNkN2NmMFwvZGc2Z3V6Zi0xMDA4YzlmYS04NzkzLTRiMzMtYTU1My02YzI2YWNhY2U2ZmMuanBnIiwiaGVpZ2h0IjoiPD0zNDAwIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uud2F0ZXJtYXJrIl0sIndtayI6eyJwYXRoIjoiXC93bVwvMGZhYzQyZGUtYzc0ZS00YWM4LWExZjAtZmRjN2RmY2Q3Y2YwXC96bGF0YW5vdml0Y2gtNC5wbmciLCJvcGFjaXR5Ijo5NSwicHJvcG9ydGlvbnMiOjAuNDUsImdyYXZpdHkiOiJjZW50ZXIifX0.IWx0RZcUpevOs1lhL3MjJS2XINUVpPtgRHzkuTec_Ko"
          />
        </div>

        <ul className="mx-auto   sm:text-lg space-y-4 w-fit  md:mt-8">
          <li className="w-fit text-sm font-semibold flex gap-1">
            <FaCheck className="text-xl text-green-600 fill-green-600" />
            Laminado resistente a rallones y huellas dactilares
          </li>
          <li className="w-fit text-sm font-semibold flex gap-1">
            <FaCheck className="text-xl text-green-600 fill-green-600" />
            Compatible con carga inalambrica
          </li>
          <li className="w-fit text-sm font-semibold flex gap-1">
            <FaCheck className="text-xl text-green-600 fill-green-600" />
            Laminado con garantia
          </li>

          <div className="flex justify-center">
            <Button
              variant="outline"
              className="m-auto mt-2 md:mt-8 text-base flex gap-2"
            >
              <Link href="/configure/design">
                Crea tu propia funda Ahora{" "}
              </Link>
              <FaArrowRight className="text-xl" />
            </Button>
          </div>
        </ul>
      </div>
    </MaxWidthWrapper>
  </section>  )
}

export default CustomCaseLayer