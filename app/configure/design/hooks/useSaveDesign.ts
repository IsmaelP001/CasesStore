import { useUploadThing } from "@/lib/uploadthings";
import { useDesign } from "./useDesign-context";
import { startTransition } from "react";
import { useRouter } from "next/navigation";
import { toPng } from "html-to-image";
import { useToast } from "@/components/ui/use-toast";

export const useSaveDesign = () => {
  const router = useRouter();
  const {
    designOptions,
    imagesState,
    textState,
    stickersState,
    caseDimensions,
    textContainerRef,
    setOpenSelectDeviceSidebar
  } = useDesign();
  const {toast}=useToast()

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      const configId = data.serverData.configId;
      if(!designOptions.device.id || !designOptions.material.id){
        setOpenSelectDeviceSidebar(true)
        return
      }
      startTransition(() => {
        router.push(`/preview?id=${configId}&deviceId=${designOptions.device.id}&materialId=${designOptions.material.id}`);
      });
    },
    onUploadError: (err) => {
      toast({
        title:'Error',
        description:"Algo salio mal, intentelo mas tarde.",
        variant:"destructive"
      })
    },
  });

  const saveConfiguration = async () => {
    try {
      const { leftOffset, topOffset, width, height } = caseDimensions!;
      const scaleFactor = 4;
      const canvas = document.createElement("canvas");
      canvas.width = width * scaleFactor;
      canvas.height = height * scaleFactor;
      const ctx = canvas.getContext("2d");

      ctx!.fillStyle = designOptions.color.hex;
      ctx!.fillRect(0, 0, canvas.width, canvas.height);

      if (imagesState?.length) {
        const imagesPromises = stickersState.items.map((image) => {
          return new Promise<void>((resolve) => {
            const customImage = new Image();
            customImage.crossOrigin = "anonymous";
            customImage.src = image.image.src;
            customImage.onload = () => {
              ctx?.drawImage(
                customImage,
                (image.x - leftOffset) * scaleFactor,
                (image.y - topOffset) * scaleFactor,
                image.width * scaleFactor,
                image.height * scaleFactor
              );
              resolve();
            };
          });
        });
        await Promise.all(imagesPromises)
      }

      if (textContainerRef.current) {
        const textImageUrl = await toPng(textContainerRef.current, {
          quality: 1,
          pixelRatio: 3,
        });
        const textImage = new Image();
        textImage.crossOrigin = "anonymous";
        textImage.src = textImageUrl;

        await new Promise((resolve) => {
          textImage.onload = resolve;
        });

        ctx?.drawImage(
          textImage,
          (textState.position.x - leftOffset) * scaleFactor,
          (textState.position.y - topOffset) * scaleFactor,
          textState.size.width * scaleFactor,
          textState.size.height * scaleFactor
        );
      }

      if (stickersState.items.length) {
        const stickerPromises = stickersState.items.map((sticker) => {
          return new Promise<void>((resolve) => {
            const stickerImage = new Image();
            stickerImage.crossOrigin = "anonymous";
            stickerImage.src = sticker.image.src;
            stickerImage.onload = () => {
              ctx?.drawImage(
                stickerImage,
                (sticker.x - leftOffset) * scaleFactor,
                (sticker.y - topOffset) * scaleFactor,
                sticker.width * scaleFactor,
                sticker.height * scaleFactor
              );
              resolve();
            };
          });
        });
        await Promise.all(stickerPromises)
      }


      canvas.toBlob(async (blob) => {
        if (blob) {
          const file = new File([blob], "filename.png", { type: "image/png" });
          await startUpload([file]);
        }
      });
    } catch (err) {
      throw new Error('Error uploading images')
    }
  };

  return { saveConfiguration, isUploading };
};
