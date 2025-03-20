"use client";
import { ModelType } from "@/app/api/predictions/route";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useRef } from "react";

export interface AnimationStyle {
  type: "animate" | "removeBg";
  animateType?: string;
  subAnimateType?: string;
}

interface ModelConfig {
  model: ModelType;
  prompt: string;
  negativePrompt?: string;
}

interface ModelConfigs {
  avatar: ModelConfig;
  hero: ModelConfig;
  anime: ModelConfig;
  cartoon: ModelConfig;
  removeBg: ModelConfig;
}

const modelConfigs: ModelConfigs = {
  avatar: { model: "photomaker-style", prompt: "" },
  hero: {
    model: "bytedance",
    prompt:
      "Ultra-realistic portrait, hyper-detailed, photorealistic, 8K resolution, cinematic lighting, realistic skin textures, dynamic pose.",
    negativePrompt:
      "lowres, bad anatomy, extra limbs, deformed, poorly drawn face, cartoonish, anime, blurry, oversaturated, watermark, text.",
  },
  anime: {
    model: "bytedance",
    prompt:
      "Ultra-detailed 2D anime illustration, vibrant colors, smooth shading, cinematic atmosphere, precise line art, dynamic composition.",
    negativePrompt:
      "3D, CGI, low quality, blurry, pixelated, distorted features, realistic textures, glitch effects, watermark, text.",
  },
  cartoon: {
    model: "bytedance",
    prompt:
      "Highly detailed Pixar-style animated avatar, vibrant colors, ultra-sharp rendering, smooth skin, expressive eyes, cinematic lighting.",
    negativePrompt:
      "low quality, blurry, deformed, extra limbs, uncanny valley, noisy background, poor lighting, watermark, text.",
  },
  removeBg: { model: "removeBackground", prompt: "" },
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function useTransformImages() {
  const abortControllerRef = useRef<AbortController | null>(null);

  const mutation = useMutation({
    mutationFn: async ({ file, animationStyle }: { file: File; animationStyle: AnimationStyle }) => {
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;
      
      const modelItem = animationStyle.type === "removeBg" ? animationStyle.type : animationStyle.animateType;
      const modelConfig = modelConfigs?.[modelItem as keyof ModelConfigs];
      const prompt = `${modelConfig.prompt} ${animationStyle.subAnimateType || ""} ${animationStyle.animateType || ""}`;

      const formData = new FormData();
      formData.append("image", file);
      formData.append("modelType", modelConfig.model);
      formData.append("prompt", prompt);
      if (modelConfig?.negativePrompt) formData.append("negativePrompt", modelConfig.negativePrompt);

      const loadingToast = toast.loading("Procesando imagen...");

      try {
        if (signal.aborted) {
          toast.error("Operación cancelada por el usuario", { id: loadingToast });
          throw new DOMException("La operación ha sido cancelada", "AbortError");
        }

        const response = await fetch("/api/predictions", { 
          method: "POST", 
          body: formData,
          signal
        });
        
        let prediction = await response.json();

        if (response.status !== 201 || prediction.status === "failed") {
          throw new Error(prediction.error || prediction.detail || "Error en la predicción");
        }

        let result = { id: prediction.id, status: prediction.status, output: "" };

        toast.loading("Generando imagen con IA...", { id: loadingToast });

        while (prediction.status !== "succeeded" && prediction.status !== "failed") {
          if (signal.aborted) {
            try {
              await fetch(`/api/predictions/${prediction.id}/cancel`, { 
                method: "POST",
              });
            } catch (cancelError) {
              console.warn("No se pudo cancelar la predicción en el servidor", cancelError);
            }
            
            toast.error("Operación cancelada por el usuario", { id: loadingToast });
            throw new DOMException("La operación ha sido cancelada", "AbortError");
          }

          await sleep(1000);
          
          const pollResponse = await fetch(`/api/predictions/${prediction.id}`, { signal });
          prediction = await pollResponse.json();

          if (pollResponse.status !== 200) {
            throw new Error(prediction.error || prediction.detail || "Error en la consulta");
          }

          if (prediction.status === "failed") {
            throw new Error(prediction.error || prediction.detail || "Error en el procesamiento");
          }

          result = {
            ...prediction,
            status: prediction.status,
            output: Array.isArray(prediction.output) ? prediction.output[0] : prediction.output || "",
          };
        }

        toast.success("¡Imagen generada con éxito!", { id: loadingToast });
        return result;
      } catch (error: any) {
        if (error.name === "AbortError") {
          toast.dismiss(loadingToast);
          throw error;
        }
        throw error;
      }
    },
    onError: (error: Error) => {
      if (error.name === "AbortError") {
        return;
      }
      
      const errorMessage = error.message;
      if (errorMessage.includes("cannot identify image file")) {
        toast.error(
          "No se detectó un rostro. Asegúrate de que sea visible o usa una imagen de mejor calidad."
        );
      } else {
        toast.error(
          "Ocurrió un error al procesar la imagen. Por favor, intenta de nuevo."
        );
      }
    },
  });

  const cancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      
      toast.dismiss(); 
      toast("Operación cancelada", { icon: '⚠️' });
      
      mutation.reset();
    }
  };

  return {
    ...mutation,
    cancel
  };
}