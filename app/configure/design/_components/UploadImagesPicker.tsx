"use client";
import { v4 as uuidv4 } from "uuid";
import CustomImageUploader from "@/components/CustomImageUploader";
import NextImage from "next/image";
import {
  ChevronRight,
  Eraser,
  ImageOff,
  PlusCircle,
  Trash,
} from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import useTransformImages, {
  AnimationStyle,
} from "@/app/configure/design/hooks/useTransformImages";
import Loading from "../loading";
import { Skeleton } from "@/components/ui/skeleton";
import {
  categories,
  subCategories,
} from "@/config/validators/transform-images-options";
import { cn } from "@/lib/utils/utils";
import { featureFlags } from "@/config/featureflags";
import {
  ImageElement,
  useDesignElements,
  useDesignUI,
  useDesignV2,
} from "../hooks/useDesign-contextV2";

export interface ImagePreview {
  uploadedUrl: string;
  transformedUrl?: string;
  imagePreviewUrl: string;
  file: File;
}

interface ImageItemProps {
  image: any;
  containerClass?: string;
  imageClass?: string;
  onRemove?: (id: string) => void;
}

interface PreviewModalProps {
  isPreviewOpen: boolean;
  setIsPreviewOpen: (open: boolean) => void;
  previewImage: ImagePreview | null;
  handleSaveImage: (imageUrl: string) => void;
  handlePreviewImage: (data: ImagePreview) => void;
  isMobile: boolean;
}

interface GalleryProps {
  imagesState: any[];
  handleImageUpload: (file: File) => void;
  removeCustomImage: (id: string) => void;
}

export function ImageItem({
  image,
  containerClass,
  imageClass,
  onRemove,
}: ImageItemProps) {
  return (
    <article className={cn("relative  rounded-md", containerClass)}>
      <NextImage
        fill
        src={image.url}
        sizes="w-full h-full"
        className={cn("rounded-md object-cover", imageClass)}
        alt="custom image"
      />
      <div className="absolute inset-0 z-20 bg-gray-300/50" />
      {onRemove && (
        <button
          className="absolute bg-red-200/70 p-2 rounded-full z-20 top-[50%] -translate-y-[50%] right-[50%] translate-x-[50%]"
          onClick={() => onRemove(image.id)}
        >
          <Trash className="text-red-500" />
        </button>
      )}
    </article>
  );
}

const ImagePreview = ({
  previewImage,
  isPending,
  isMobile,
}: {
  previewImage: any;
  isPending: boolean;
  isMobile: boolean;
}) => (
  <div className="flex justify-center my-4">
    <div className="relative max-w-full max-h-64 overflow-hidden rounded-md">
      {isPending && <Skeleton className="w-[400px] h-[300px] z-50"></Skeleton>}

      {!isPending && previewImage.imagePreviewUrl ? (
        <NextImage
          src={previewImage.imagePreviewUrl}
          width={isMobile ? 300 : 400}
          height={isMobile ? 250 : 500}
          alt="Preview"
          className={`object-contain ${
            isMobile ? "h-[250px] w-[300px]" : "h-[300px] w-[400px]"
          } rounded-md bg-gray-200`}
        />
      ) : null}
    </div>
  </div>
);

const ToggleImageButton = ({
  previewImage,
  tooglePreviewImage,
}: {
  previewImage: any;
  tooglePreviewImage: () => void;
}) =>
  previewImage?.transformedUrl && previewImage.uploadedUrl ? (
    <Button
      onClick={tooglePreviewImage}
      size="sm"
      variant="outline"
      className="rounded-3xl"
    >
      {previewImage.transformedUrl &&
      previewImage.imagePreviewUrl !== previewImage.transformedUrl
        ? "Ver creacion"
        : "Ver original"}
    </Button>
  ) : null;

const AnimationOptions = ({
  selectedEditOption,
  setSelectedEditOption,
  isMobile,
}: {
  selectedEditOption: AnimationStyle | null;
  setSelectedEditOption: React.Dispatch<
    React.SetStateAction<AnimationStyle | null>
  >;
  isMobile: boolean;
}) => {
  if (selectedEditOption?.type !== "animate") return null;

  return (
    <div className="flex flex-col gap-1">
      <div
        className={`flex justify-center gap-2 ${
          isMobile ? "overflow-x-auto" : ""
        }`}
      >
        {categories.map((category) => (
          <article
            key={category.id}
            className={`flex flex-col items-center cursor-pointer p-2 rounded-md ${
              selectedEditOption?.animateType === category.value
                ? "border-2 border-blue-500"
                : "border border-transparent"
            }`}
            onClick={() =>
              setSelectedEditOption({
                ...selectedEditOption,
                animateType: category.value as any,
                subAnimateType: "",
              })
            }
          >
            <NextImage
              src={category.src}
              width={isMobile ? 40 : 50}
              height={isMobile ? 25 : 30}
              alt={category.label}
              className={`object-cover object-top rounded-md ${
                isMobile ? "w-[60px] h-[60px]" : "w-[75px] h-[75px]"
              }`}
            />
            <span className="text-sm font-semibold text-gray-500 mt-2">
              {category.label}
            </span>
          </article>
        ))}
      </div>
      {subCategories?.[
        selectedEditOption?.animateType as keyof typeof subCategories
      ] && (
        <div
          className={`flex overflow-x-auto ${
            isMobile ? "max-w-[300px]" : "max-w-[400px]"
          }`}
        >
          {subCategories?.[
            selectedEditOption?.animateType as keyof typeof subCategories
          ]?.map((subCategory) => (
            <article
              key={subCategory.id}
              className={`flex flex-col min-w-[80px] items-center cursor-pointer p-2 rounded-md ${
                selectedEditOption?.subAnimateType === subCategory.value
                  ? "border-2 border-blue-500"
                  : "border border-transparent"
              }`}
              onClick={() =>
                setSelectedEditOption({
                  ...selectedEditOption,
                  subAnimateType: subCategory.value!,
                } as any)
              }
            >
              <NextImage
                src={subCategory.src}
                width={isMobile ? 40 : 50}
                height={isMobile ? 25 : 30}
                alt={subCategory.label}
                className={`object-cover object-top ${
                  isMobile ? "w-[40px] h-[40px]" : "w-[50px] h-[50px]"
                }`}
              />
              <span className="text-xs text-nowrap font-medium max-w-[75px] truncate mt-2">
                {subCategory.label}
              </span>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

const ActionButtonsAnimate = ({
  selectedEditOption,
  setSelectedEditOption,
  handleRemoverClick,
  handleAnimarClick,
  isPending,
  previewImage,
  handleTransformImage,
  isMobile,
}: {
  selectedEditOption: AnimationStyle | null;
  setSelectedEditOption: React.Dispatch<
    React.SetStateAction<AnimationStyle | null>
  >;
  handleRemoverClick: () => void;
  handleAnimarClick: () => void;
  isPending: boolean;
  previewImage: any;
  handleTransformImage: (params: any) => void;
  isMobile: boolean;
}) => (
  <div className="flex justify-center gap-x-4">
    {featureFlags.enableBackgroundRemoval && (
      <Button
        variant={
          selectedEditOption?.type === "removeBg" ? "secondary" : "outline"
        }
        className="rounded-2xl"
        size="sm"
        onClick={handleRemoverClick}
      >
        <Eraser />
        Remover Fondo
      </Button>
    )}
    {featureFlags.enableAnimations && (
      <Button
        variant={
          selectedEditOption?.type === "animate" ? "secondary" : "outline"
        }
        className="rounded-2xl"
        size="sm"
        onClick={handleAnimarClick}
      >
        <ImageOff />
        Animar{" "}
      </Button>
    )}
    {selectedEditOption &&
    (featureFlags.enableAnimations || featureFlags.enableBackgroundRemoval) ? (
      <Button
        disabled={!selectedEditOption?.type || isPending}
        onClick={() =>
          handleTransformImage({
            file: previewImage.file,
            animationStyle: selectedEditOption!,
          })
        }
        className="rounded-2xl bg-gray-500"
        size="sm"
      >
        {isPending ? "Generando" : "Generar"}
        {isPending ? <Loading /> : <ChevronRight />}
      </Button>
    ) : null}
  </div>
);

export function PreviewModal({
  isPreviewOpen,
  setIsPreviewOpen,
  previewImage,
  handleSaveImage,
  handlePreviewImage,
  isMobile,
}: PreviewModalProps) {
  const [selectedEditOption, setSelectedEditOption] =
    useState<AnimationStyle | null>(null);

  const {
    isPending,
    error,
    data: prediction,
    mutate: handleTransformImage,
    cancel,
  } = useTransformImages();

  useEffect(() => {
    if (prediction?.output) {
      handlePreviewImage({
        ...previewImage,
        imagePreviewUrl: prediction.output,
        transformedUrl: prediction.output,
      } as any);
    }
  }, [prediction]);

  if (!previewImage) return null;

  const handleAnimarClick = () => {
    if (!featureFlags.enableAnimations) return;
    setSelectedEditOption({ ...selectedEditOption, type: "animate" });
  };

  const handleRemoverClick = () => {
    if (!featureFlags.enableBackgroundRemoval) return;
    setSelectedEditOption({ ...selectedEditOption, type: "removeBg" });
  };

  const tooglePreviewImage = () => {
    let newImagePreview = "";
    if (
      previewImage.transformedUrl &&
      previewImage.imagePreviewUrl !== previewImage.transformedUrl
    ) {
      newImagePreview = previewImage.transformedUrl;
    } else {
      newImagePreview = previewImage.uploadedUrl;
    }
    handlePreviewImage({
      ...previewImage,
      imagePreviewUrl: newImagePreview,
    } as any);
  };

  if (isMobile) {
    return (
      <Drawer open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DrawerContent>
          <div className="max-h-[95svh] overflow-y-scroll">
            <DrawerHeader>
              <DrawerTitle>Vista previa de imagen</DrawerTitle>

              <div className="flex justify-between items-center text-center">
                <DrawerDescription className="text-center pt-0.5">
                  {featureFlags.enableAnimations
                    ? "Personaliza tu imagen: anímala, elimina el fondo o súbela tal cual."
                    : "Previsualización de imagen."}
                </DrawerDescription>
                <div>
                  <ToggleImageButton
                    previewImage={previewImage}
                    tooglePreviewImage={tooglePreviewImage}
                  />
                </div>
              </div>
            </DrawerHeader>

            <div className="px-4 space-y-1 ">
              <div>
                <ImagePreview
                  previewImage={previewImage}
                  isPending={isPending}
                  isMobile={isMobile}
                />

                {featureFlags.enableAnimations && (
                  <AnimationOptions
                    selectedEditOption={selectedEditOption}
                    setSelectedEditOption={setSelectedEditOption}
                    isMobile={isMobile}
                  />
                )}
              </div>

              <ActionButtonsAnimate
                selectedEditOption={selectedEditOption}
                setSelectedEditOption={setSelectedEditOption}
                handleRemoverClick={handleRemoverClick}
                handleAnimarClick={handleAnimarClick}
                isPending={isPending}
                previewImage={previewImage}
                handleTransformImage={handleTransformImage}
                isMobile={isMobile}
              />
            </div>

            <DrawerFooter>
              <Button
                disabled={isPending}
                onClick={() => handleSaveImage(previewImage.imagePreviewUrl)}
                className="w-full rounded-2xl"
              >
                Añadir
              </Button>
              <DrawerClose asChild>
                <Button
                  onClick={cancel}
                  variant="outline"
                  className="w-full rounded-2xl"
                >
                  Cancelar
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
      <DialogContent className="sm:max-w-md ">
        <div className="max-h-[85svh] space-y-3 overflow-y-auto">
          <DialogHeader>
            <div className="flex justify-around items-center">
              <div>
                <DialogTitle>Vista previa de imagen</DialogTitle>
                <DrawerDescription className="text-center pt-0.5">
                  {featureFlags.enableAnimations
                    ? "Personaliza tu imagen: anímala, elimina el fondo o súbela tal cual."
                    : "Previsualización de imagen."}
                </DrawerDescription>
              </div>
              {featureFlags.enableAnimations ||
              featureFlags.enableBackgroundRemoval ? (
                <div>
                  <ToggleImageButton
                    previewImage={previewImage}
                    tooglePreviewImage={tooglePreviewImage}
                  />
                </div>
              ) : null}
            </div>
          </DialogHeader>

          <ImagePreview
            previewImage={previewImage}
            isPending={isPending}
            isMobile={isMobile}
          />

          <AnimationOptions
            selectedEditOption={selectedEditOption}
            setSelectedEditOption={setSelectedEditOption}
            isMobile={isMobile}
          />

          <ActionButtonsAnimate
            selectedEditOption={selectedEditOption}
            setSelectedEditOption={setSelectedEditOption}
            handleRemoverClick={handleRemoverClick}
            handleAnimarClick={handleAnimarClick}
            isPending={isPending}
            previewImage={previewImage}
            handleTransformImage={handleTransformImage}
            isMobile={isMobile}
          />

          <DialogFooter>
            <Button
              size="sm"
              className="w-full"
              variant="outline"
              onClick={() => {
                cancel();
                setIsPreviewOpen(false);
              }}
            >
              Cancelar
            </Button>
            <Button
              size="sm"
              disabled={isPending}
              className="w-full"
              onClick={() => handleSaveImage(previewImage.imagePreviewUrl)}
            >
              Agregar
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function MobileGallery({
  imagesState,
  handleImageUpload,
  removeCustomImage,
}: GalleryProps) {
  return (
    <>
      <Drawer>
        <DrawerTrigger className="flex gap-2 items-center justify-center flex-nowrap w-full overflow-x-scroll overflow-y-hidden">
          <>
            <PlusCircle size={40} />
            {imagesState.length > 0 &&
              imagesState.map((image: any, index: number) => (
                <ImageItem
                  key={index}
                  image={image}
                  containerClass="relative p-3 w-[50px] h-[50px]"
                />
              ))}
          </>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Imagenes</DrawerTitle>
            <DrawerDescription>Pulse para añadir</DrawerDescription>
          </DrawerHeader>
          <div className=" px-3 py-2 space-y-2 place-items-center">
            <CustomImageUploader
              triggerComponent={
                <div className="text-center">
                  <PlusCircle className="m-auto" size={40} />
                  <p className="text-xs font-light pt-1">
                    Sube tu imagen aqui!
                  </p>
                </div>
              }
              onFileSelect={handleImageUpload}
            />
            <div className="flex gap-1 flex-nowrap w-full overflow-x-auto">
              {imagesState.length > 0 &&
                imagesState.map((image: any, index: number) => (
                  <ImageItem
                    key={index}
                    image={image}
                    containerClass="relative !w-[80px] h-[80px] w-fit p-3 flex-none"
                    imageClass=" object-cover z-10"
                    onRemove={removeCustomImage}
                  />
                ))}
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose>
              <Button className="w-full rounded-2xl">Guardar</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export function DesktopGallery({
  imagesState,
  handleImageUpload,
  removeCustomImage,
}: GalleryProps) {
  return (
    <>
      <CustomImageUploader onFileSelect={handleImageUpload} />
      <div className="flex gap-1 flex-nowrap w-full overflow-x-auto mt-3">
        {imagesState.length > 0 &&
          imagesState.map((image: any, index: number) => (
            <ImageItem
              key={index}
              image={image}
              containerClass="flex-none !w-[80px] h-[80px] relative w-fit p-3"
              onRemove={removeCustomImage}
            />
          ))}
      </div>
    </>
  );
}

export default function UploadImagesPicker() {
  const { setDesignElements, designElements } = useDesignElements();
  const { configuratorDimensions } = useDesignUI();
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<ImagePreview | null>(null);

  const openPreviewModal = (imageUrl: string, file: File) => {
    setPreviewImage({ imagePreviewUrl: imageUrl, uploadedUrl: imageUrl, file });
    setIsPreviewOpen(true);
  };

  const handleImageUpload = (file: File) => {
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    openPreviewModal(imageUrl, file);
  };

  const handlePreviewImage = (data: ImagePreview) => {
    setPreviewImage(data);
  };

  const handleSaveImage = (imageUrl: string) => {
    if (!previewImage || !previewImage.file) return;

    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      const originalWidth = img.width;
      const originalHeight = img.height;
      const scale = configuratorDimensions.phone.height / originalHeight;
      const width = originalWidth * scale;
      const height = configuratorDimensions.phone.height;
      const x = configuratorDimensions.container.width / 2;
      const y = configuratorDimensions.container.height / 2;
      const id = uuidv4();
      const designItem: ImageElement = {
        id,
        type: "image",
        url: imageUrl,
        size: { width, height },
        position: { x, y },
        rotation: 0,
      };

      setDesignElements([...designElements, designItem]);
      setIsPreviewOpen(false);
    };
  };

  return (
    <>
      {isMobile ? (
        <MobileGallery
          imagesState={[]}
          handleImageUpload={handleImageUpload}
          removeCustomImage={()=>false}
        />
      ) : (
        <DesktopGallery
          imagesState={[]}
          handleImageUpload={handleImageUpload}
          removeCustomImage={()=>false}
        />
      )}
      <PreviewModal
        isMobile={isMobile}
        isPreviewOpen={isPreviewOpen}
        setIsPreviewOpen={setIsPreviewOpen}
        previewImage={previewImage}
        handleSaveImage={handleSaveImage}
        handlePreviewImage={handlePreviewImage}
      />
    </>
  );
}
