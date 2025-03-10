"use client";
import { trpc } from "@/lib/trpc/client";
import React, { useState } from "react";
import Product from "./Product";
import { SearchParams } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex items-center justify-center mt-6 space-x-2">
      {currentPage > 1 && (
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className={`size-10 rounded-full `}
        >
          <ChevronLeft size={30} />
        </Button>
      )}

      <div className="flex items-center gap-4 text-base bg-white rounded-full px-2 py-2 font-bold">
        <p className=" size-9  text-white rounded-full bg-primary grid place-content-center ">
          {currentPage}
        </p>{" "}
        de <p className=" mr-2 ">{totalPages}</p>
      </div>

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`size-10 rounded-full `}

      >
        <ChevronRight size={24} />
      </Button>
    </div>
  );
};

const ProductList = ({ searchParams }: { searchParams: SearchParams }) => {
  const [products] = trpc.catalog.getProducts.useSuspenseQuery(searchParams);
  const router = useRouter();
  return (
    <div>
      {products?.items.length ? (
        <div className="grid gap-5 place-items-center md:place-items-start grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
          {products?.items.map((product: any) => (
            <Product key={product.id} product={product}></Product>
          ))}
        </div>
      ) : (
        <div className="min-h-screen w-full flex ">
          <h2 className="text-xl font-semibold mt-5 ml-5">
            Resultados no encontrados...
          </h2>
        </div>
      )}
      {products?.pagination?.totalPages > 1 && (
        <Pagination
          currentPage={parseInt(searchParams?.page) || 1}
          totalPages={products.pagination.totalPages}
          onPageChange={(newPage) => {
            const newParams = new URLSearchParams(searchParams);
            newParams.set("page", newPage.toString());
            router.replace(`/cases?${newParams.toString()}`);
          }}
        />
      )}
    </div>
  );
};

export default ProductList;
