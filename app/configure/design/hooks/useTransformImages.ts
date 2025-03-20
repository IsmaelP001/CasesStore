"use client";
import { ModelType } from "@/app/api/predictions/route";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

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

async function transformImage({ file, animationStyle }: { file: File; animationStyle: AnimationStyle }) {
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
    const response = await fetch("/api/predictions", { method: "POST", body: formData });
    let prediction = await response.json();

    if (response.status !== 201 || prediction.status === "failed") {
      throw new Error(prediction.error || prediction.detail || "Error en la predicción");
    }

    let result = { id: prediction.id, status: prediction.status, output: "" };

    toast.loading("Generando imagen con IA...", { id: loadingToast });

    while (prediction.status !== "succeeded" && prediction.status !== "failed") {
      await sleep(1000);
      const pollResponse = await fetch(`/api/predictions/${prediction.id}`);
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
    throw error;
  }
}

export default function useTransformImages() {
  return useMutation({
    mutationFn: transformImage,
    onError: (error: Error) => {
      const errorMessage = error.message;
      if (
        errorMessage.includes("cannot identify image file")
      ) {
        toast.error(
          "No se detectó un rostro. Asegúrate de que sea visible o usa una imagen de mejor calidad."
        );
      } else {
        toast.error(
          "Ocurrió un error al procesar la imagen. Por favor, intenta de nuevo."
        );
      }
    },
    onSuccess: (data) => {
      console.log("Transformación exitosa:", data);
    },
  });
}


