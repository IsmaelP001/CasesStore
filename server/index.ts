
import { addressRouter } from "../server/routers/addressRoute";
import { cartRouter } from "../server/routers/CartRoute";
import { discountCodeRouter } from "../server/routers/discountCodeRoute";
import { favoriteRouter } from "../server/routers/favoriteRoute";
import { giftRouter } from "../server/routers/giftRoute";
import { orderRouter } from "../server/routers/orderRoute";
import { catalogRouter} from "./routers/catalogRoute";
import { userRouter } from "../server/routers/userRoute";
import { router } from "./trpc";

export const appRouter = router({
    catalog:catalogRouter,
    cart:cartRouter,
    discountCode:discountCodeRouter,
    user:userRouter,
    userFeatures:router({
        gift:giftRouter,
        address:addressRouter,
        favorite:favoriteRouter
    }),
    order:orderRouter
    
})

export type AppRouter = typeof appRouter;
