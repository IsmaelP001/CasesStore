import { Button } from "../../../../components/ui/button";
import { trpc } from "@/lib/trpc/client";
import { useGiftContext } from "../giftContext";
import useGiftActions from "../giftActions";
import Loading from "@/components/Loading";
import { DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils/utils";
import { Gift } from "@/server/user/domain/gift.model";

type GiftItemProps = {
  gift: Gift;
  isSelected: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onSelect: () => void;
  onRemove: () => void;
};

const GiftContactList = () => {
  const { currentGiftId, handleSetEditGift, open, handleRenderState } =
    useGiftContext()!;
  const {
    setDefaultGift,
    deleteGift,
    removeDefaultGift,
    isPending: isPendingMutation,
    error
  } = useGiftActions();

  const {
    data: giftData,
    isFetching,
    isPending,
  } = trpc.userFeatures.gift.getUserGift.useQuery(undefined, {
    enabled: !!open, 
  });
  

  return (
    <div className="modal-box grid grid-rows-[auto_1fr_auto] gap-4 relative min-h-[200px]">
      {isFetching || isPendingMutation ? (
        <div className="rounded-sm absolute inset-0 bg-slate-300/10 h-full grid place-content-center">
          <Loading />
        </div>
      ) : null}
      <header className="flex justify-between">
        <DialogTitle className="font-bold text-2xl mb-5">
          Cambiar información
        </DialogTitle>
      </header>
      {!isPending && !giftData?.length ? (
        <div className="h-full grid place-content-center">
          <h4>No resultados encontrados...</h4>
        </div>
      ) : (
        <div className="space-y-6">
          {giftData?.map((gift) => (
            <GiftItem
              key={gift.id}
              gift={gift}
              isSelected={gift.id === currentGiftId}
              onEdit={() => {
                handleRenderState("update");
                handleSetEditGift(gift);
              }}
              onDelete={() => deleteGift({ giftId: gift.id! })}
              onSelect={() => setDefaultGift({ giftId: gift.id! })}
              onRemove={()=>removeDefaultGift()}
            />
          ))}
        </div>
      )}
      <Button onClick={() => handleRenderState("create")}>
        Añadir información de regalo
      </Button>
    </div>
  );
};

const GiftItem = ({
  gift,
  isSelected,
  onEdit,
  onDelete,
  onSelect,
  onRemove,
}: GiftItemProps) => {
  const { firstName, lastName, message } = gift;
  return (
    <article>
      <p>{`${firstName}, ${lastName}`}</p>
      <p className="text-xs text-ellipsis overflow-hidden">{message}</p>
      <div className="flex gap-6">
        <Button className={cn(isSelected && 'text-yellow-600')} variant="link" onClick={isSelected ? onRemove : onSelect}>
          {isSelected ? "Remover de orden" : "Seleccionar"}
        </Button>
        <Button variant="link" onClick={onEdit}>
          Editar
        </Button>
        <Button variant="link" className="text-red-600" onClick={onDelete}>
          Eliminar
        </Button>
      </div>
    </article>
  );
};

export default GiftContactList;
