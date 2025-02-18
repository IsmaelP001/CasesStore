import { trpc } from "@/lib/trpc/client";
import { useState } from "react";
import { useGiftContext } from "./giftContext";
import { useToast } from "@/components/ui/use-toast";

const useGiftActions = () => {
  const utils = trpc.useUtils();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { editGiftData, currentGiftId,handleRenderState,handleOpenCloseModal} = useGiftContext()!;
  const {toast}=useToast()
  const handleError = ({error,errorMessage}:{error:any,errorMessage?:string}) => {
    toast({
      title: "Error",
      description: errorMessage || 'Un error a occurido, intente de nuevo mas tarde',
      variant:"destructive"
    })
    setIsPending(false)
    setError(error)
  };

  const handleResetState = () => {
    setIsPending(false)
    setError(null)
  };

  const { mutate: createGift } = trpc.userFeatures.gift.createGift.useMutation({
    onMutate: () => setIsPending(true),
    onSuccess: () => {
      if (currentGiftId === editGiftData?.id) {
        utils.userFeatures.gift.getDefaultGift.invalidate();
      }
      utils.userFeatures.gift.getUserGift.invalidate()
      handleRenderState('list')
    },
    onError: (error) => handleError({error}),
  });

  const { mutate: updateGift } = trpc.userFeatures.gift.updateGift.useMutation({
    onMutate: () => setIsPending(true),
    onSuccess: () => {
      utils.userFeatures.gift.getUserGift.invalidate()
      handleResetState()
      handleRenderState('list')
    },
    onError: (error) => handleError({error}),
  });

  const { mutate: setDefaultGift } = trpc.userFeatures.gift.updateDefaulfGift.useMutation({
    onMutate: () => setIsPending(true),
    onSuccess: () => {
      utils.userFeatures.gift.getDefaultGift.invalidate();
      handleResetState()
      handleOpenCloseModal()
    },
    onError: (error) => handleError({error}),
  });

  const { mutate: removeDefaultGift } = trpc.userFeatures.gift.removeDefaulfGift.useMutation({
    onMutate: () => setIsPending(true),
    onSuccess: () => {
      utils.userFeatures.gift.getDefaultGift.invalidate();
      handleResetState()
      handleOpenCloseModal()
    },
    onError: (error) => handleError({error}),
  });

  const { mutate: deleteGift } = trpc.userFeatures.gift.deleteGift.useMutation({
    onMutate: () => setIsPending(true),
    onSuccess: () => {
      utils.userFeatures.gift.getUserGift.invalidate()
      handleResetState();
    },
    onError: (error) => handleError({error}),
  });

  return {
    createGift,
    updateGift,
    setDefaultGift,
    deleteGift,
    isPending,
    removeDefaultGift,
    error,
  };
};

export default useGiftActions;
