import { PlusCircle } from "lucide-react";
import Image from "next/image";
import * as React from "react";

type CustomImageUploaderProps = {
  onFileSelect: (file: File) => void;
  triggerComponent?: React.ReactNode;
  accept?: string;
};

const CustomImageUploader: React.FC<CustomImageUploaderProps> = ({
  onFileSelect,
  triggerComponent,
  accept = "image/*",
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleTriggerClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onFileSelect(file);
      }
    }
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`border-2 border-dashed  rounded-lg p-4 transition-all ${
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
    >
      <input
        type="file"
        accept={accept}
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div 
        onClick={handleTriggerClick} 
        className="flex flex-col items-center justify-center cursor-pointer"
      >
        {triggerComponent || (
          <div className="text-center">
            <Image width={200} height={200} src='/upload-image-2.gif' alt="upload image icon" className="w-[120px] h-auto mx-auto"/>
            <p className="mt-2 text-sm text-gray-500">
              {isDragging ? "Suelta la imagen aquí" : "Haz clic o arrastra una imagen aquí"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomImageUploader;