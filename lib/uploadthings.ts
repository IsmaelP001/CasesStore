import { generateReactHelpers } from "@uploadthing/react";
import { OurFileRouter } from "../app/(store)/case/api/uploadthing/core";

export const {useUploadThing,uploadFiles}=generateReactHelpers<OurFileRouter>()