"use client";
import { v4 as uuidv4 } from "uuid";
import { useDesign } from "../hooks/useDesign-context";
import CustomImageUploader from "@/components/CustomImageUploader";
import NextImage from "next/image";
import { PlusCircle, Trash } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export default function UploadImagesPicker() {
  const { imagesState, setImagesState, caseDimensions, removeCustomImage } =
    useDesign();
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });

  const handleImageUpload = (file: File) => {
    if (!file || !Object.values(caseDimensions)?.length) return;
    const {
      leftOffset,
      topOffset,
      width: widthContainer,
      height: heightContainer,
    } = caseDimensions;
    const imageUrl = URL.createObjectURL(file);
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      const originalWidth = img.width;
      const originalHeight = img.height;

      const scale = heightContainer / originalHeight;

      const width = originalWidth * scale;
      const height = heightContainer;

      const x = (widthContainer - width) / 2 + leftOffset;
      const y = (heightContainer - height) / 2 + topOffset;
      const id = uuidv4();
      const newImage = {
        id,
        url: imageUrl,
        width,
        height,
        position: { x, y },
      };
      setImagesState([...imagesState, newImage]);
    };
  };

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="flex gap-2 items-center justify-center flex-nowrap w-full  overflow-x-scroll overflow-y-hidden">
        <>
            <PlusCircle size={40}  />
            {imagesState.length > 0 &&
              imagesState.map((image, index) => (
                <article className="relative p-3 w-[50px] h-[50px]" key={index}>
                  <NextImage
                    key={index}
                    width={80}
                    height={80}
                    src={image!.url!}
                    className="w-[40px] h-[40px] object-cover "
                    alt="custom image"
                  />
                  <div className="absolute inset-0 z-20 bg-gray-300/50" />
                  <button
                    className="absolute bg-red-200/70 p-2 rounded-full z-20 top-[50%] -translate-y-[50%]  right-[50%] translate-x-[50%] "
                  >
                    <Trash className="text-red-500 size-[15px] md:size-[40px]" />
                  </button>
                </article>
              ))}
          </>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Imagenes</DrawerTitle>
            <DrawerDescription>Pulse para añadir</DrawerDescription>
          </DrawerHeader>
          <div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(80px,1fr))] px-3 py-2 place-items-center">
            <CustomImageUploader onFileSelect={handleImageUpload} />
            {imagesState.length > 0 &&
              imagesState.map((image, index) => (
                <article className="relative p-3" key={index}>
                  <NextImage
                    key={index}
                    width={80}
                    height={80}
                    src={image!.url!}
                    className="w-[80px] h-[80px] object-cover z-10"
                    alt="custom image"
                  />
                  <div className="absolute inset-0 z-20 bg-gray-300/50" />
                  <button
                    className="absolute  bg-red-200/70 p-2 rounded-full z-20 top-[50%] -translate-y-[50%]  right-[50%] translate-x-[50%] "
                    onClick={() => removeCustomImage(image.id)}
                  >
                    <Trash className="text-red-500" />
                  </button>
                </article>
              ))}
          </div>
          <DrawerFooter>
            <DrawerClose>
              <Button className="w-full rounded-2xl">Guardar</Button>
            </DrawerClose>{" "}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <div className=" grid place-items-center grid-cols-[repeat(auto-fit,minmax(80px,1fr))] mt-3">
      <CustomImageUploader onFileSelect={handleImageUpload} />
      {imagesState.length > 0 &&
        imagesState.map((image, index) => (
          <article className="relative p-3" key={index}>
            <NextImage
              key={index}
              width={80}
              height={80}
              src={image!.url!}
              className="w-[80px] h-[80px] object-cover z-10"
              alt="custom image"
            />
            <div className="absolute inset-0 z-20 bg-gray-300/50" />
            <button
              className="absolute bg-red-200/70 p-2 rounded-full z-20 top-[50%] -translate-y-[50%]  right-[50%] translate-x-[50%] "
              onClick={() => removeCustomImage(image.id)}
            >
              <Trash className="text-red-500" />
            </button>
          </article>
        ))}
    </div>
  );
}
