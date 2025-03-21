import {
    HydrationBoundary,
    dehydrate,
  } from "@tanstack/react-query";
import FavoritesPage from "./FavoritesPage";
import { serverHelpers } from "@/lib/trpc/serverHelper";

export const dynamic = "force-dynamic";

const page = async () => { 

  await serverHelpers.userFeatures.favorite.getUserFavorites.prefetch()

  return (
    <HydrationBoundary state={dehydrate(serverHelpers.queryClient)}>
      <FavoritesPage />
    </HydrationBoundary>
  )
}

export default page