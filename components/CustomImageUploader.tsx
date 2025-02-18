import { PlusCircle } from "lucide-react";
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

  const handleTriggerClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept={accept}
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div onClick={handleTriggerClick} style={{ cursor: "pointer" }}>
        {triggerComponent || (
          <button type="button">
            <PlusCircle size={50}/>
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomImageUploader;
