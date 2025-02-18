"use client";
import Loading from "../loading";

export const UploadOverlay = () => {
  return (
    <div className="bg-gray-200/90 backdrop-blur-sm fixed inset-0 z-[999] grid place-content-center">
      <Loading />
    </div>
  );
};
