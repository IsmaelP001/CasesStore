import { createUploadthing, type FileRouter } from "uploadthing/next";
import sharp from "sharp";
import { db } from "../../../config/database/db";
import { configurationimage } from "../../../config/database/schemes";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ input }) => {
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {

      const res = await fetch(file.url);
      const buffer = await res.arrayBuffer();

      const imageMetadata = await sharp(buffer).metadata();
      const { width, height } = imageMetadata;

      try {
        const configuration = await db
          .insert(configurationimage)
          .values({
            imageUrl: file.url,
            height: height || 500,
            width: width || 500,
          })
          .returning();
        return { configId: configuration[0].id };
      } catch (err) {
        console.log("error in db", err);
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
