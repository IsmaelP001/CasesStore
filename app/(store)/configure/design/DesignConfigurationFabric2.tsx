"use client";
import { revalidatePath } from "next/cache";
import NextImage, { StaticImageData } from "next/image";
import { Rnd } from "react-rnd";
import { RadioGroup } from "@headlessui/react";
import {
  useEffect,
  useRef,
  useState,
  ChangeEvent,
  startTransition,
} from "react";
import {
  COLORS,
  FINISHES,
  MATERIALS,
  MODELS,
  STIKERS_OPTIONS,
} from "../../../../validators/option-validator";

import { ArrowRight, Check, ChevronsUpDown } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { cn, formatPrice } from "../../../../lib/utils/utils";
import { ScrollArea } from "../../../../components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { useUploadThing } from "../../../../lib/uploadthings";
import { SaveConfigArgs, saveConfig as _saveConfig } from "./action";
import { Button } from "../../../../components/ui/button";
import HandleComponent from "../../_components/HandleComponent";
import { AspectRatio } from "../../../../components/ui/aspect-ratio";
import { Label } from "../../../../components/ui/label";
import { Alfa_Slab_One } from "next/font/google";
import { Input } from "../../../../components/ui/input";
import { FaTrash } from "react-icons/fa";

//fabric
import DeleteComponent from "../../_components/DeleteComponent";
import { generateUploadButton } from "@uploadthing/react";
import { ourFileRouter } from "../../../api/uploadthing/core";

export const UploadButton = generateUploadButton<typeof ourFileRouter>();

const AlbaSlabOne = Alfa_Slab_One({
  subsets: ["latin"],
  weight: ["400"],
});

const FONT_POSITIONS = [
  { icon: "inferior", value: "BOTTON", x: 297, y: 400, height: 70, width: 150 },
  { icon: "medio", value: "MIDDLE", x: 297, y: 250, height: 70, width: 150 },
  {
    icon: "vertical",
    value: "VERTICAL",
    x: 340,
    y: 200,
    height: 300,
    width: 153,
  },
];

const calculateFontSize = (height, width, length) => {
  // Calcula el tamaño de la fuente basada en las dimensiones del contenedor
  const newFontSize = Math.round((height + width) / (length + 1));
  return newFontSize; // Ajusta este valor según sea necesario
};

interface DesignConfiguratorProps {
  configId: string;
  imageUrl: string;
  imageDimensions: { width: number; height: number };
}

interface StickerOptions {
  currentTabIndex: number;
  selectedStickerId: number | null;
  stickersInScreen: object[];
  selectedStickerIndex: number | null;
}

const DesignConfigurator = () => {
  const router = useRouter();

  const [customText, setCustomText] = useState("");
  const [fontSizeCustom, setFontSize] = useState(50);
  const [fontPosition, setFontPosition] = useState(FONT_POSITIONS[0]);
  const customTextContainerRef = useRef(null);
  const spanContainerRef = useRef(null)
  const [stickerOptions, setStickersOptions] = useState<StickerOptions>({
    currentTabIndex: 0,
    selectedStickerId: null,
    stickersInScreen: [],
    selectedStickerIndex: null,
  });
  const [uploadedImage, setUploadedImage] = useState(null);

  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number];
    model: (typeof MODELS.options)[number];
    material: (typeof MATERIALS.options)[number];
  }>({
    color: COLORS[0],
    model: MODELS.options[0],
    material: MATERIALS.options[0],
  });

  const [renderedDimension, setRenderedDimension] = useState({
    width: 500,
    height: 500,
  });

  //part of image overlaping with the phone
  const [renderedPosition, setRenderedPosition] = useState({
    x: 150,
    y: 205,
  });

  const phoneCaseRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null); //gray area container

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      const configId = data.serverData.configId;
      startTransition(() => {
        router.push(`/configure/preview?id=${configId}`);
      });
    },
    onUploadProgress: (p) => {
      // setUploadProgress(p)
    },
    onUploadError: (err) => {
      console.log("eror,", err);
    },
  });


  async function saveConfiguration() {
    try {
      const {
        left: caseLeft,
        top: caseTop,
        width,
        height,
      } = phoneCaseRef.current!.getBoundingClientRect();

      const { left: containerLeft, top: containerTop } =
        containerRef.current!.getBoundingClientRect();

      const leftOffset = caseLeft - containerLeft;
      const topOffset = caseTop - containerTop;

      const actualX = renderedPosition.x - leftOffset;
      const actualY = renderedPosition.y - topOffset;

      // Factor de escala para mejorar la calidad
      const scaleFactor = 4; // Puedes ajustar este valor según tus necesidades

      const canvas = document.createElement("canvas");
      canvas.width = width * scaleFactor;
      canvas.height = height * scaleFactor;
      const ctx = canvas.getContext("2d");

      if (uploadedImage) {
        const userImage = new Image();
        userImage.crossOrigin = "anonymous";
        userImage.src = uploadedImage?.URL;
        await new Promise((resolve) => (userImage.onload = resolve));

        ctx?.drawImage(
          userImage,
          actualX * scaleFactor,
          actualY * scaleFactor,
          renderedDimension.width * scaleFactor,
          renderedDimension.height * scaleFactor
        );
      } else {
        ctx.fillStyle = options.color.hex; // Define el color del rectángulo
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Dibuja el rectángulo
      }

      // Add stickers
      const stickerPromises = stickerOptions.stickersInScreen.map((sticker) => {
        return new Promise((resolve) => {
          const { image, width, height, x, y } = sticker;
          const leftSticker = x - leftOffset;
          const topSticker = y - topOffset;

          const stickerImage = new Image();
          stickerImage.crossOrigin = "anonymous";
          stickerImage.src = image.src;
          stickerImage.onload = () => {
            ctx?.drawImage(
              stickerImage,
              leftSticker * scaleFactor,
              topSticker * scaleFactor,
              width * scaleFactor,
              height * scaleFactor
            );
            resolve(); // Resuelve la promesa una vez que la imagen del sticker se haya dibujado
          };
        });
      });

      // Esperar a que todas las imágenes de los stickers se carguen y se dibujen
      await Promise.all(stickerPromises);

      // Add text
      
      // const positionText=customTextContainerRef?.current?.getBoundingClientRect();
      // const fontX = positionText.left - leftOffset;
      // const fontY = positionText.top - topOffset;

      // ctx.font = `${fontSizeCustom * scaleFactor}px ${
      //   AlbaSlabOne.style.fontFamily
      // }`;
      // ctx.fillStyle = "white";
      // ctx.fillText(customText, fontX * scaleFactor, fontY * scaleFactor);
      // ctx.translate(50, 50); // mover el punto de rotación
      // ctx.rotate(-Math.PI / 2); // rotar 90 grados en sentido antihorario

      
      const blob = canvas.toBlob(async (blob) => {
        if (blob) {
          const file = new File([blob], "filename.png", { type: "image/png" });
          await startUpload([file]);
        }
      });

      // Upload image to server
    } catch (err) {
      console.log("error uploading", err);
    }
  }


  const deleteSticker = (id) => {
    const updatedItems = stickerOptions.stickersInScreen.filter(
      (sticker) => sticker.id !== id
    );
    setStickersOptions({
      ...stickerOptions,
      stickersInScreen: updatedItems,
    });
  };

  useEffect(() => {
    // if (customText.length <= 2) return; //previene incremento drastico de tamaño de letra cuando es inferior a 2 caracteres
    // const newFontSize = calculateFontSize(
    //   fontPosition.height,
    //   fontPosition.width,
    //   customText.length
    // );
    const {width,height}= spanContainerRef?.current?.getBoundingClientRect() || {};
    setFontPosition((prev)=>{
      const newObject = {
        ...prev,
        width:width + 150,
        height:height -100
      }
      console.log('newObject',newObject)
      return newObject
    })
    setFontSize(height);
    console.log('SPAN DIMENTIONS',width,height);
    console.log('fontPosition',fontPosition);

  }, [customText]);

  return (
    <>
      {isUploading && (
        <div className="bg-gray-200/75 absolute inset-0 z-[999]  grid place-content-center">
          <h4 className="text-2xl font-semibold flex gap-1">
            Creando tú cubierta personalizada
            <span className="ml-1.5 flex items-center gap-1">
              <span className="animate-flashing w-1 h-1 bg-white rounded-full inline-block"></span>
              <span className="animate-flashing delay-100 w-1 h-1 bg-white rounded-full inline-block"></span>
              <span className="animate-flashing delay-200 w-1 h-1 bg-white rounded-full inline-block"></span>
            </span>
          </h4>
        </div>
      )}
      <div className="relative  mt-10 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-10 px-5">
        <div
          ref={containerRef}
          className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
            <AspectRatio
              ref={phoneCaseRef}
              ratio={896 / 1831}
              className="pointer-events-none relative z-50 aspect-[896/1831] w-full"
            >
              <NextImage
                fill
                alt="phone image"
                src="/phone-template.png"
                className="pointer-events-none z-50 select-none object-contain"
              />
            </AspectRatio>

            <div className="absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]"></div>
            <div
              style={{backgroundColor:options.color.hex}}
              className={cn(
                "absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] "
              )}
            />
          </div>

          {/* height: imageDimensions.height / 4, */}
          {uploadedImage && (
            <Rnd
              default={{
                x: 125,
                y: 50,
                height: uploadedImage.height || 500,
                width: uploadedImage.width || 500,
              }}
              onResizeStop={(_, __, ref, ___, { x, y }) => {
                setRenderedDimension({
                  height: parseInt(ref.style.height.slice(0, -2)),
                  width: parseInt(ref.style.width.slice(0, -2)),
                });

                setRenderedPosition({ x, y });
              }}
              onDragStop={(_, data) => {
                const { x, y } = data;
                setRenderedPosition({ x, y });
              }}
              className="absolute z-20 border-[3px] border-primary"
              lockAspectRatio
              resizeHandleComponent={{
                bottomRight: <HandleComponent />,
                bottomLeft: <HandleComponent />,
                topRight: <HandleComponent />,
                topLeft: <HandleComponent />,
              }}
            >
              <div className="relative w-full h-full">
                <NextImage
                  src={uploadedImage.URL}
                  fill
                  alt="your image"
                  className="pointer-events-none object-cover"
                />
              </div>
            </Rnd>
          )}

          {customText.length > 0 && (
            <Rnd
              size={{
                width: fontPosition.width,
                height: fontPosition.height,
              }}
              position={{ x: fontPosition.x, y: fontPosition.y }}
              onResizeStop={(_, __, ref, ___, { x, y }) => {
                setFontPosition((prev) => {
                  return {
                    ...prev,
                    height: parseInt(ref.style.height.slice(0, -2)),
                    width: parseInt(ref.style.width.slice(0, -2)),
                    x,
                    y,
                  };
                });
              }}
              onDragStop={(_, data) => {
                setFontPosition((prev) => {
                  return {
                    ...prev,
                    x: data.x,
                    y: data.y,
                  };
                });
              }}
              className=" z-20 border-[1px] rounded-xl border-primary"
              lockAspectRatio
              resizeHandleComponent={{
                bottomRight: <HandleComponent />,
                bottomLeft: <HandleComponent />,
                topRight: <HandleComponent />,
                topLeft: <HandleComponent />,
              }}
            >
              <div
                className={` ${AlbaSlabOne.className} relative m-0 p-0 bg-red-200 `}
                style={{
                  width: `${(fontPosition.width)}px`,
                  height: `${fontPosition.height}px`,
                  fontSize:`${fontPosition.height}px`
                }}
                ref={customTextContainerRef}
              >
                {/* <h2
                  className="absolute grid place-content-center min-w-full min-h-full m-0 bg-blue-200 box-border text-nowrap  object-contain overflow-hidden  text-white font-black  tracking-widest"
                  style={{
                    fontSize: `${fontSizeCustom}px`,
                    writingMode: `${
                      fontPosition.value === "VERTICAL"
                        ? "vertical-lr"
                        : "horizontal-tb"
                    }`,
                    textShadow: "6px 6px 2px rgba(2,2,2,2)",
                  }}
                >
                  {customText}
                </h2> */}
                 <span ref={spanContainerRef} className="bg-blue-200">{customText}</span>
              </div>
            </Rnd>
          )}

          {/* STICKER */}
           {/* STICKER */}
           {stickerOptions.stickersInScreen.map((sticker, index) => (
            <Rnd
              key={index}
              default={{
                x: sticker.x,
                y: sticker.y,
                height: sticker.height,
                width: sticker.width,
              }}
              onResizeStop={(_, __, ref, ___, { x, y }) => {
                const updatedStickersInScreen =
                  stickerOptions.stickersInScreen.map((currentSticker) => {
                    if (currentSticker.id === sticker.id) {
                      (currentSticker.x = x),
                        (currentSticker.y = y),
                        (currentSticker.width = parseInt(
                          ref.style.width.slice(0, -2)
                        ));
                      currentSticker.height = parseInt(
                        ref.style.height.slice(0, -2)
                      );

                      return currentSticker;
                    }
                    return currentSticker;
                  });

                setStickersOptions((prev) => ({
                  ...prev,
                  stickersInScreen: updatedStickersInScreen,
                  selectedStickerId: sticker.id,
                }));
              }}
              onDragStop={(_, data) => {
                const { x, y } = data;
                const updatedStickersInScreen =
                  stickerOptions.stickersInScreen.map((currentSticker) => {
                    if (currentSticker.id === sticker.id) {
                      currentSticker.x = x;
                      currentSticker.y = y;
                      return currentSticker;
                    }
                    return currentSticker;
                  });

                setStickersOptions((prev) => ({
                  ...prev,
                  stickersInScreen: updatedStickersInScreen,
                  selectedStickerId: sticker.id,
                }));
              }}
              className={`absolute z-20 border-[1px] border-transparent ${
                stickerOptions.selectedStickerId === sticker.id &&
                "!border-primary"
              }`}
              lockAspectRatio
              resizeHandleComponent={{
                bottomRight:
                  stickerOptions.selectedStickerId === sticker.id ? (
                    <HandleComponent />
                  ) : null,
                bottomLeft:
                  stickerOptions.selectedStickerId === sticker.id ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="p-0 m-0 h-auto text-red-500 hover:text-red-400 hover:bg-transparent"
                      onClick={() => deleteSticker(sticker.id)}
                    >
                      <FaTrash className="text-xl text-inherit" />
                    </Button>
                  ) : null,
                topRight:
                  stickerOptions.selectedStickerId === sticker.id ? (
                    <HandleComponent />
                  ) : null,
                topLeft:
                  stickerOptions.selectedStickerId === sticker.id ? (
                    <HandleComponent />
                  ) : null,
              }}
            >
              <div className="">
                <NextImage
                  src={sticker?.image || ""}
                  fill
                  alt="your sticket"
                  className="pointer-events-none object-cover"
                />
              </div>
            </Rnd>
          ))}
        </div>

        <div className="h-[37.5rem]  flex flex-col bg-white">
          <ScrollArea className="relative flex-1 overflow-auto ">
            <div
              aria-hidden="true"
              className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"
            />

            <div className="px-8 pb-2">
              <h2 className="tracking-tight font-bold text-3xl">
                Personaliza tu cubierta
              </h2>

              <div className="w-full h-px bg-zinc-200 mt-2 mb-4" />

              <div className="relative h-full flex flex-col justify-between space-y-3">
                <div>
                  <Label className="mb-2 text-base font-semibold">
                    Texto personalizado
                  </Label>

                  <div className="flex items-center">
                    <Input
                      className="border-2 "
                      placeholder="ej: tu texto "
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                    ></Input>
                  </div>
                </div>

                <div>
                  <RadioGroup
                    value={options.color}
                    onChange={(val) => {
                      setOptions((prev) => ({
                        ...prev,
                        color: val,
                      }));
                    }}
                  >
                    <Label className="text-base font-semibold">
                      Color:{" "}
                      <span className="font-normal">{options.color.label}</span>
                    </Label>
                    <div className="mt-2 flex items-center space-x-3">
                      {COLORS.map((color) => (
                        <RadioGroup.Option
                          key={color.label}
                          value={color}
                          className={({ active, checked }) =>
                            cn(
                              "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent",
                              {
                                [color.tw]: active || checked,
                              }
                            )
                          }
                        >
                          <span
                          style={{backgroundColor:color.hex}}
                            className={cn(
                             
                              "h-8 w-8 rounded-full border border-black border-opacity-10"
                            )}
                          />
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-base font-semibold">
                    Posicion del texto
                  </Label>
                  <div className="flex gap-3 ">
                    {FONT_POSITIONS.map((position, index) => (
                      <div key={index} className="">
                        <input
                          value={index}
                          type="radio"
                          name="selectColors"
                          onChange={() => {
                            setFontPosition(position);
                          }}
                        ></input>
                        <span>{position.icon}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-base font-semibold">
                    Añadir imagen
                  </Label>
                  <Input
                    type="file"
                    onChange={(e) => {
                      const imageUrl = URL.createObjectURL(e.target?.files[0]);
                      const img = new Image();
                      img.src = imageUrl;
                      img.onload = () => {
                        const width = img.width;
                        const height = img.height;
                        setUploadedImage({ URL: imageUrl, width, height });
                      };
                    }}
                  ></Input>
                </div>

                <div>
                  <Label className="text-base font-semibold">Stickers</Label>
                  <div className="space-y-2">
                    <div className="flex  bg-gray-200 rounded-2xl">
                      {STIKERS_OPTIONS.map((sticker, index) => (
                        <Button
                          className={`flex-1 bg-transparent h-7 text-primary rounded-xl hover:bg-blue-200  ${
                            stickerOptions.currentTabIndex === index
                              ? "bg-blue-500 "
                              : ""
                          }`}
                          key={index}
                          onClick={() =>
                            setStickersOptions((prev) => ({
                              ...prev,
                              currentTabIndex: index,
                            }))
                          }
                        >
                          <span>{sticker.type}</span>
                        </Button>
                      ))}
                    </div>
                    <ul className="grid gap-1 grid-cols-[repeat(auto-fit,minmax(78px,1fr))]">
                      {STIKERS_OPTIONS[
                        stickerOptions.currentTabIndex
                      ].content.map((sticker, index) => (
                        <li
                          key={index}
                          className={`border rounded-xl grid place-content-center ${
                            stickerOptions.stickersInScreen.includes(sticker)
                              ? "border-primary"
                              : ""
                          }`}
                          onClick={() => {
                            setStickersOptions((prev) => ({
                              ...prev,
                              selectedStickerId: sticker.id,
                              stickersInScreen: [
                                ...prev.stickersInScreen,
                                sticker,
                              ],
                            }));
                          }}
                        >
                          <NextImage
                            src={sticker.image}
                            width={70}
                            height={70}
                            alt="sticket image"
                          ></NextImage>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="w-full px-8 h-10 bg-white">
            <div className="h-px w-full bg-zinc-200" />
            <div className="w-full h-full flex justify-end items-center">
              <div className="w-full flex gap-2  items-center">
                <Button size="sm" className="flex-1">
                  Atras
                </Button>
                <Button
                  isLoading={isUploading}
                  disabled={isUploading}
                  loadingText="Saving"
                  onClick={() => saveConfiguration()}
                  size="sm"
                  className="w-full btn btn-primary"
                >
                  Guardar
                  <ArrowRight className="h-4 w-4 ml-1.5 inline" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignConfigurator;
