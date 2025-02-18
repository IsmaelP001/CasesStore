import { useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils/utils';

interface ColorPickerProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: any;
  className?: string;
}

export default function ColorPicker({ onChange, value, className }: ColorPickerProps) {
  const colorInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };

  return (
    <div className="rounded-full h-fit" style={{ position: 'relative', width: 'fit-content' }}>
      <input
        ref={colorInputRef}
        type="color"
        onChange={onChange}
        value={value}
        style={{
          opacity: 0,
          position: 'absolute',
          width: '100%',
          height: '100%',
          cursor: 'pointer',
        }}
      />
      <Image
        width={30}
        height={30}
        className={cn("w-[35px] h-[35px] object-contain cursor-pointer",className)}
        src={'/icons/color-palet.png'}
        alt="icon colors palet"
        onClick={handleClick} 
      />
    </div>
  );
}
