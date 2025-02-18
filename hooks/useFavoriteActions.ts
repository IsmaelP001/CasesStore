"use client";
import { useToast } from "@/components/ui/use-toast";
import { trpc } from "@/lib/trpc/client";
import { TRPCError } from "@trpc/server";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const useFavoriteActions = (defaultItemFavoriteState?: boolean) => {
  const utils = trpc.useUtils();
  const router = useRouter();
  const { toast } = useToast();
  const [isItemInFavorite, setIsItemInFavorite] = useState<boolean>(
   false
  );

  useEffect(()=>{
    if(!defaultItemFavoriteState)return
    setIsItemInFavorite(defaultItemFavoriteState)
  },[defaultItemFavoriteState])


  const {
    mutate: addItemToFavoriteAction,
    isPending: isPendingAdd,
    isError: isErrorAdd,
  } = trpc.userFeatures.favorite.addItem.useMutation({
    onSuccess() {
      setIsItemInFavorite(true);
      utils.userFeatures.favorite.getUserFavorites.invalidate();
      toast({
        title: "Favoritos",
        description: "Articulo añadido tus favoritos con exito",
        variant: "default",
      });
    },
    onError(err) {
      console.log('err favorite',err)
      let defaultErrorMsg = "Hubo un  error al añadir el articulo, por favor intente mas tarde.";
      if (err.data?.code === "UNAUTHORIZED") {
        router.push("/auth/signin");
        return;
      }
      else if (err.data?.code === 'CONFLICT') {
        setIsItemInFavorite(true);
        defaultErrorMsg='Este producto ya esta en tus favoritos'
      }else{
        setIsItemInFavorite(false);
      }
      toast({
        title: "Favoritos",
        description:defaultErrorMsg,
        variant: "destructive",
      });
    },
  });

  const {
    mutate: removeItemFavoriteAction,
    isPending: isPendingRemove,
    isError: isErrorRemove,
  } = trpc.userFeatures.favorite.removeItem.useMutation({
    onSuccess() {
      setIsItemInFavorite(false);
      utils.userFeatures.favorite.getUserFavorites.invalidate();
    },
  });

  const handleIsItemInFavorite = (value: boolean): void => {
    setIsItemInFavorite(value);
  };

  const isPending = isPendingAdd || isPendingRemove ? true : false;
  const isError = isErrorAdd || isErrorRemove ? true : false;




  return {
    addItemToFavoriteAction,
    removeItemFavoriteAction,
    handleIsItemInFavorite,
    isItemInFavorite,
    isPending,
    isError,
  };
};

export default useFavoriteActions;
