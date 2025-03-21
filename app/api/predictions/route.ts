import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export type ModelType='removeBackground' | 'faceToMany' | 'bytedance' | 'photomaker-style'

export async function POST(request: NextRequest) {
    try {
      const formData = await request.formData();
      const imageFile = formData.get("image");
      const modelType = formData.get("modelType") as ModelType
      const prompt = formData.get("prompt") as string
      const negativePrompt = formData.get("negativePrompt") as string

      
      if (!(imageFile instanceof File)) {
        return NextResponse.json({ error: "No valid image provided" }, { status: 400 });
      }
      
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Image = buffer.toString("base64");
      const dataURI = `data:${imageFile.type};base64,${base64Image}`;
      
      let modelVersion, input;
      


      switch(modelType) {
        case "removeBackground":
          modelVersion = "95fcc2a26d3899cd6c2691c900465aaeff466285a65c14638cc5f36f34befaf1";
          input = { image: dataURI };
          break;
        case "faceToMany":
          modelVersion = "a07f252abbbd832009640b27f063ea52d87d7a23a185ca165bec23b5adc8deaf";
          input = {
            image: dataURI,
            style: 'Clay',
            prompt: prompt,
            instant_id_strength: 0.8,
            negative_prompt:negativePrompt
          };
          break; 
          case "bytedance":
            modelVersion = "43d309c37ab4e62361e5e29b8e9e867fb2dcbcec77ae91206a8d95ac5dd451a0";
            input = {
              main_face_image: dataURI,
              prompt: prompt,
              negative_prompt:negativePrompt ? negativePrompt : "flaws in the eyes, flaws in the face, flaws, lowres, non-HDRi, low quality, worst quality,artifacts noise, text, watermark, glitch, deformed, mutated, ugly, disfigured, hands, low resolution, partially rendered objects,  deformed or partially rendered eyes, deformed, deformed eyeballs, cross-eyed,blurry"
            };
          break;
          case "photomaker-style":
            modelVersion = "467d062309da518648ba89d226490e02b8ed09b5abc15026e54e31c5a8cd0769";
            input = {
              input_image: dataURI,
              prompt: prompt,
              num_steps: 50,
              negative_prompt: "realistic, photo-realistic, worst quality, greyscale, bad anatomy, bad hands, error, text",
              style_strength_ratio: 35,
              style_name:'Cinematic',
              num_outputs:1,
              guidance_scale:5,
              seed:1066381928
            };
          break;
        default:
          return NextResponse.json({ error: "Invalid model type" }, { status: 400 });
      }
   

      await new Promise((resolve)=>setTimeout(resolve,8000))


      const prediction = await replicate.predictions.create({
        version: modelVersion,
        input: input
      });

      
      return NextResponse.json(prediction, { status: 201 });
    } catch (error) {
      return NextResponse.json({error:'Fail to convert image',details:error},{status:500})
    }
  }