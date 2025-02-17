"use client";

import { Button } from "../../../../components/ui/button";
import { trpc } from "@/lib/trpc/client";
import { useAddressContext } from "../addressContext";
import useAddressActions from "../useAddressActions";
import Loading from "@/components/Loading";
import { DialogTitle } from "@/components/ui/dialog";
import { Address } from "@/server/user/domain/address.model";

interface AddressItem {
  address: Address;
  isSelected?: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onSelect: () => void;
}

const AddressList = () => {
  const {
    currentAddressId,
    handleSetEditAddress,
    handleOpenCloseModal,
    handleRenderState,
    open,
  } = useAddressContext()!;
  const {
    setDefaultAddress,
    deleteAddress,
    isPending: isPendingMutation,
  } = useAddressActions();

  const {
    data: addresses,
    isPending,
    isFetching,
  } = trpc.userFeatures.address.getUserAddresses.useQuery(undefined, {
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
          Cambiar dirección
        </DialogTitle>
      </header>
      {!isPending && !addresses?.length ? (
        <div className="h-full grid place-content-center">
          <h4>No resultados encontrados...</h4>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex-1 space-y-6 overflow-auto">
            {addresses?.map((address) => (
              <AddressItem
                key={address.id}
                isSelected={currentAddressId === address.id}
                address={address}
                onEdit={() => {
                  handleRenderState("update");
                  handleSetEditAddress(address);
                }}
                onDelete={() => deleteAddress({ addressId: address.id! })}
                onSelect={() => setDefaultAddress({ addressId: address.id! })}
              />
            ))}
          </div>
        </div>
      )}
      <Button onClick={() => handleRenderState("create")}>
        Añadir nueva dirección
      </Button>
    </div>
  );
};

const AddressItem = ({
  address,
  isSelected,
  onEdit,
  onDelete,
  onSelect,
}: AddressItem) => {
  const { street, city, zipCode } = address;
  return (
    <article>
      <p>{`${street}, ${city}, ${zipCode}`}</p>
      <div className="flex gap-6">
        <Button variant="link" disabled={isSelected} onClick={onSelect}>
          Seleccionar
        </Button>
        <Button variant="link" onClick={onEdit}>
          Editar
        </Button>
        {!isSelected && (
          <Button variant="link" className="text-red-600" onClick={onDelete}>
            Eliminar
          </Button>
        )}
      </div>
    </article>
  );
};

export default AddressList;
