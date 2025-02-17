import useHandleParams from '@/hooks/useHandleParams';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { trpc } from '@/lib/trpc/client';
import React, { useState } from 'react';

const FilterColors = () => {
    const [colors] = trpc.catalog.getColors.useSuspenseQuery();
    const { setRemoveConsecutiveParam, getParam } = useHandleParams();

 

    const selectedColors = getParam('color')?.split('%') || [];

    const handleCheckboxChange = (name: string) => {
        setRemoveConsecutiveParam("color", name);
    };

    return (
        <div>
            <h3 className="font-semibold">Colores</h3>
            <div className="space-y-2 mt-2">
                {colors?.map((color) => (
                    <div key={`color-${color.id}`} className="flex items-center gap-1">
                        <Checkbox
                            id={color.name}
                            checked={selectedColors.includes(color.name)}
                            onCheckedChange={() => handleCheckboxChange(color.name)}
                        />
                        <Label htmlFor={color.name}>{color.name}</Label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterColors;
