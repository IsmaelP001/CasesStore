'use client';

import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc/client";
import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loading from "@/components/Loading";

const FilterSearch = () => {
  const [query, setQuery] = useState<string>("");
  const [value] = useDebounce(query, 400);

  const { data, isPending, isError, error } = trpc.catalog.getProductsBySearchCriteria.useQuery(
    { query: value },
    {
      enabled: !!value, 
    }
  );

  return (
    <div className="relative z-30 max-w-[800px]">
      <Input
        type="text"
        className="w-full"
        placeholder="Buscar por nombre, dispositivo o colecciones..."
        onChange={(e) => setQuery(e.target.value)}
      />

      {isPending && query && (
        <div className="absolute z-10 mt-2 w-full border p-5 border-gray-300 rounded-md bg-white shadow-lg">
          <p className="px-4 py-2 text-gray-500"><Loading/></p>
        </div>
      )}

      {isError && query && (
        <div className="absolute z-10 mt-2 w-full border p-5 border-gray-300 rounded-md bg-white shadow-lg">
          <p className="px-4 py-2 text-red-500">
            Error al cargar los productos: {error?.message || "Intenta de nuevo más tarde"}
          </p>
        </div>
      )}

      {data && query && data.length > 0 && (
        <ul className="absolute z-10 mt-2 w-full border px-2 py-3 space-y-2 border-gray-300 rounded-md bg-white shadow-lg">
          {data.map((product) => (
            <li key={product.id}>
              <Link
                href={`/product/${product.id}`}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200 space-x-2"
              >
                <span>{product.name}</span>,
                <span>{product.collection}</span>

              </Link>
            </li>
          ))}
        </ul>
      )}

      {data && query && data.length === 0 && (
        <div className="absolute z-10 mt-2 w-full border border-gray-300 rounded-md bg-white shadow-lg">
          <p className="px-4 py-2 text-gray-500">No se encontraron productos</p>
        </div>
      )}
    </div>
  );
};

export default FilterSearch;
