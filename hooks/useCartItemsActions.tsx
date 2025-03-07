import { useToast } from "@/components/ui/use-toast";
import {
  CartItem,
  setLastItemAdded,
} from "@/config/redux/features/cart/cartSlice";
import { setIsCartOpen } from "@/config/redux/features/order/orderSlice";
import { trpc } from "@/lib/trpc/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

interface ProductUpdate {
  colorId: string;
  deviceId: string;
  prevQuantity: number;
  newQuantity: number;
  productId: string;
  configurationId?: string;
}

interface CustomCaseItem {
  deviceId: string;
  productId: string;
  configurationId: string;
}

const useCartItemsActions = (
  onErrorRollbackQuantity?: () => void,
  isCartItemUpdate?: boolean
) => {
  const utils = trpc.useUtils();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { status } = useSession();
  const router = useRouter();
  const {
    mutate: addCartItemMutation,
    mutateAsync: addCartItemMutationAsync,
    isPending,
  } = trpc.cart.addItem.useMutation({
    onSuccess(data) {
      utils.cart.getItems.invalidate();
      if (!isCartItemUpdate) {
        dispatch(setIsCartOpen({ isCartOpen: true }));
      }
    },
    onError(err) {
      toast({
        title: "Carrito",
        description:
          "Hubo un  error al añadir el articulo, por favor intente mas tarde.",
        variant: "destructive",
      });
    },
  });

  const {
    mutate: updateItemQuantityMutation,
    isPending:isPendingUpdate,
  } = trpc.cart.updateItemQuantity.useMutation({
    onSuccess() {
      utils.cart.getItems.invalidate();
    },
    onError(err) {
      if (onErrorRollbackQuantity) {
        onErrorRollbackQuantity();
      }
      toast({
        title: "Carrito",
        description:
          "Hubo un  error al modificar el articulo, por favor intente mas tarde.",
        variant: "destructive",
      });
    },
  });

  const handleAddCartItem = (product: CartItem) => {
    dispatch(setLastItemAdded(product))
    addCartItemMutation({
      productId: product.productId!,
      deviceId: product.device.id,
      colorId: product.colorId!,
      isAddItemFirstTime: product.isAddItemFirstTime,
    });
  };

  const handleAddCustomCaseItem = async (product: CustomCaseItem) => {
    if (status === "unauthenticated") {
      const searchParams = new URLSearchParams({
        callback: `/preview?id=${product.configurationId}&deviceId=${product.deviceId}&materialId=${product.productId}`,
      });
      router.push(`/auth/signin?${searchParams.toString()}`);
      return;
    }
    await addCartItemMutationAsync({
      productId: product.productId!,
      deviceId: product.deviceId,
      configurationId: product.configurationId,
    });
  };

  const handleQuantityChange = ({
    productId,
    prevQuantity,
    newQuantity,
    colorId,
    deviceId,
    configurationId,
  }: ProductUpdate) => {
    updateItemQuantityMutation({
      colorId,
      deviceId,
      quantity: newQuantity - prevQuantity,
      productId: productId!,
      configurationId,
    });
  };

  return {
    handleAddCartItem,
    handleQuantityChange,
    isPending,
    isPendingUpdate,
    handleAddCustomCaseItem,
  };
};

export default useCartItemsActions;
