"use client"
  import { useUploadThing } from "@/lib/uploadthings";
  import { useDesign } from "./useDesign-context";
  import { startTransition } from "react";
  import { useRouter } from "next/navigation";
  import { toPng } from "html-to-image";
  import { useToast } from "@/components/ui/use-toast";
import { useDesignUI } from "./useDesign-contextV2";

  export const useSaveDesign = () => {
    const router = useRouter();
    const {getStageImage}=useDesignUI()
    const { toast } = useToast();

    const { startUpload, isUploading } = useUploadThing("imageUploader", {
      onClientUploadComplete: ([data]) => {
        const configId = data.serverData.configId;
        startTransition(() => {
          router.push(
            `/preview?id=${configId}&deviceId=${'s'}&materialId=${'33'}`
          );
        });
      },
      onUploadError: (err) => {
        toast({
          title: "Error",
          description: "Algo salio mal, intentelo mas tarde.",
          variant: "destructive",
        });
      },
    });
    const saveConfiguration = async () => {
      const blobImage = await getStageImage();
      const file = new File([blobImage], "filename.png", { type: "image/png" });
      await startUpload([file]);
    };

    return { saveConfiguration, isUploading };
  };

 
