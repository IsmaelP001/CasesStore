import useHandleParams from "@/hooks/useHandleParams";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc/client";

const FilterCollections = () => {
    const { setRemoveConsecutiveParam, getParam } = useHandleParams();
    const [collections] = trpc.catalog.getCollections.useSuspenseQuery();

    const selectedCollections = getParam('collection')?.split('%') || [];

    const handleCheckboxChange = (name: string) => {
        setRemoveConsecutiveParam("collection", name);
    };

    return (
        <div>
            <h4 className="font-semibold">Colecciones</h4>

            <div className="space-y-2 mt-2">
                {collections?.map((collection) => (
                    <div key={collection.id} className="flex items-center gap-1">
                        <Checkbox
                            id={`collection-${collection.id}`}
                            value={collection.name}
                            name="collections"
                            checked={selectedCollections.includes(collection.name)}
                            onCheckedChange={() => handleCheckboxChange(collection.name)}
                        />
                        <Label htmlFor={`collection-${collection.id}`}>
                            {collection.name}
                        </Label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterCollections;
