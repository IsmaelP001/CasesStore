import { ReactNode } from "react";
import Navbar from "../../components/Navbar";
import { serverHelpers } from "@/lib/trpc/serverHelper";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Footer from "@/components/Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  serverHelpers.userFeatures.favorite.getUserFavorites.prefetch();
  
  return (
    <HydrationBoundary state={dehydrate(serverHelpers.queryClient)}>
      <div>
        <Navbar />
        <div className="min-h-[90vh]">{children}</div>
        <Footer/>
      </div>
    </HydrationBoundary>
  );
};

export default Layout;
