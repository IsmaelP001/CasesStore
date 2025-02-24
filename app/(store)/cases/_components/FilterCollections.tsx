import useHandleParams from "@/hooks/useHandleParams";
import { trpc } from "@/lib/trpc/client";
import FilterItem from "./FilterItem";

const FilterCollections = () => {
  const { setRemoveConsecutiveParam, getParam } = useHandleParams();
  const [collections] = trpc.catalog.getCollections.useSuspenseQuery();

  const selectedCollections = getParam("collection")?.split("%") || [];

  const handleCheckboxChange = (name: string) => {
    setRemoveConsecutiveParam("collection", name);
  };

  return (
    <div className="space-y-2 mt-2">
      {collections?.map((collection) => {
        const isSelected = selectedCollections.includes(collection.name);
        return (
          <FilterItem
            identifier={`collection-${collection.id}`}
            checked={isSelected}
            onCheckedChange={() => handleCheckboxChange(collection.name)}
          >
            {collection.name}
          </FilterItem>
        );
      })}
    </div>
  );
};

export default FilterCollections;
