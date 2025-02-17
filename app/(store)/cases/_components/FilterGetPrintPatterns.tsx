import useHandleParams from '@/hooks/useHandleParams';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { trpc } from '@/lib/trpc/client';
import React, { useState } from 'react';

const FilterGetPrintPatterns = () => {
  const [printPattern] = trpc.catalog.getPrintPatterns.useSuspenseQuery();
  const { setRemoveConsecutiveParam, getParam } = useHandleParams();

 
  const selectedPatterns = getParam("pattern")?.split("%") || [];


  const handleCheckboxChange = (name: string) => {
    setRemoveConsecutiveParam("pattern", name);
  };

  return (
    <div>
      <h3 className="font-semibold">Diseño</h3>
      <div className="space-y-2 mt-2">
        {printPattern?.map((pattern) => (
          <div key={pattern.id} className="flex items-center gap-1">
            <Checkbox
              id={pattern.name}
              value={pattern.name}
              checked={selectedPatterns.includes(pattern.name)}
              onCheckedChange={() => handleCheckboxChange(pattern.name)}
            />
            <Label htmlFor={pattern.name}>{pattern.name}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterGetPrintPatterns;
