'use server'
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const uploadProductImages = async (imagesData: FormData) => {
  const allFiles = imagesData.getAll("files");
  try {
    const rest= await utapi.uploadFiles(allFiles as any[]);
    const imagesUrls = rest.map(image=>image.data?.url!)
    return imagesUrls
  } catch (error) {
    throw new Error("error uploading images");
  }
};
