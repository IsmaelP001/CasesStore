import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import {
  addItem,
  CartItem,
  updateItemQuantity,
} from "@/config/redux/features/cart/cartSlice";
import { setIsCartOpen } from "@/config/redux/features/order/orderSlice";
import { useAppSelector } from "@/config/redux/hooks";
import { trpc } from "@/lib/trpc/client";
import { useSession } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
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
  const searchParams = useSearchParams();
  const path = usePathname()
  const { mutate: addCartItemMutation,mutateAsync:addCartItemMutationAsync, isPending } =
    trpc.cart.addItem.useMutation({
      onSuccess() {
        utils.cart.getItems.invalidate();
        utils.cart.getTotalCart.invalidate();
        {
          !isCartItemUpdate &&
            toast({
              title: "Carrito",
              description: "Articulo añadido con exito",
              variant: "default",
              action: (
                <ToastAction
                  altText="Ver carrito"
                  onClick={() => dispatch(setIsCartOpen({ isCartOpen: true }))}
                >
                  Ver carrito
                </ToastAction>
              ),
            });
        }
      },
      onError(err) {
        console.log("err create cart item", err);
        if (onErrorRollbackQuantity) {
          onErrorRollbackQuantity();
        }
        toast({
          title: "Carrito",
          description:
            "Hubo un  error al añadir el articulo, por favor intente mas tarde.",
          variant: "destructive",
        });
      },
    });

  const handleAddCartItem = (product: CartItem) => {
    if (status === "unauthenticated") {
      dispatch(
        addItem({
          productId: product.productId!,
          colorId: product.colorId,
          deviceId: product.device.id!,
          quantity: product.quantity,
          coverImage: product.coverImage!,
          name: product.name!,
          device: product.device,
          price: product.price!,
          configurationId: product?.configurationId,
          isAddItemFirstTime: product.isAddItemFirstTime,
        })
      );
      return;
    }
    addCartItemMutation({
      productId: product.productId!,
      deviceId: product.device.id,
      colorId: product.colorId!,
      isAddItemFirstTime: product.isAddItemFirstTime,
    });
  };

  const handleAddCustomCaseItem = async(product: CustomCaseItem) => {
    if (status === "unauthenticated") {
      const searchParams = new URLSearchParams({
        callback: `/preview?id=${product.configurationId}&deviceId=${product.deviceId}&materialId=${product.productId}`
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
    if (status === "unauthenticated") {
      dispatch(updateItemQuantity({ productId, quantity: newQuantity }));
      return;
    }
    addCartItemMutation({
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
    handleAddCustomCaseItem,
  };
};

export default useCartItemsActions;
