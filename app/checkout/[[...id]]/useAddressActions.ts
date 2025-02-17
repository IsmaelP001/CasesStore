import { trpc } from "@/lib/trpc/client";
import { useState } from "react";
import { useAddressContext } from "./addressContext";

const useAddressActions = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    currentAddressId,
    handleOpenCloseModal,
    handleRenderState,
  } = useAddressContext()!;
  const utils= trpc.useUtils()

  const handleError = (errorMessage: string) => {
    setIsPending(false);
    setError(errorMessage);
    console.error(errorMessage);
  };

  const handleSuccess = () => {
    setIsPending(false);
    setError(null);
  };

  // Mutaciones
  const { mutate: createAddress } = trpc.userFeatures.address.createAddress.useMutation({
    onMutate: () => setIsPending(true),
    onSuccess: () => {
      console.log('address created',)
      utils.userFeatures.address.invalidate()
      handleRenderState('list')
      handleSuccess()      
    },
    onError: () => handleError("Error creando dirección"),
  });

  const { mutate: updateAddress } = trpc.userFeatures.address.updateAddress.useMutation({
    onMutate: () => setIsPending(true),
    onSuccess: () => {
      utils.userFeatures.address.getUserAddresses.invalidate();
      handleRenderState('list')
      setIsPending(false)
    },
    onError: () => handleError("Error actualizando dirección"),
  });

  const { mutate: deleteAddress } = trpc.userFeatures.address.deleteAddress.useMutation({
    onMutate: () => setIsPending(true),
    onSuccess: () => {
      utils.userFeatures.address.getUserAddresses.invalidate();
      handleSuccess();
    },
    onError: () => handleError("Error al eliminar la dirección"),
  });

  const { mutate: setDefaultAddress } =
    trpc.userFeatures.address.updateDefaultAddress.useMutation({
      onMutate: () => setIsPending(true),
      onSuccess: () =>{
        utils.userFeatures.address.getDefaultAddress.invalidate();
        handleSuccess()
        handleOpenCloseModal()
      },
      onError: () =>
        handleError("Error al actualizar la dirección predeterminada"),
    });

  return {
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    isPending,
    error,
  };
};

export default useAddressActions;
