"use client";

import { FaArrowUpWideShort } from "react-icons/fa6";
import { FaArrowDownShortWide } from "react-icons/fa6";
import DialogChangeRol from "./DialogChangeRol";


import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { Button } from "../../../../components/ui/button";
import { useMemo, useState } from "react";
import { trpc } from "@/lib/trpc/client";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  provider: string;
  phonenumber: string;
  rol: { rol: string };
}

interface SortConfig {
  key: keyof User;
  direction: "ascending" | "descending";
}

const USERS_ROL = ["customer", "admin"] as const;
const HEADERS_TABLE = [
  { label: "Nombre", value: "firstName" },
  { label: "Apellido", value: "lastName" },
  { label: "Correo", value: "email" },
  { label: "Proveedor", value: "provider" },
  { label: "Teléfono", value: "phonenumber" },
  { label: "Rol", value: "rol" },
] as const;

const UsersList = () => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "firstName",
    direction: "ascending",
  });

  const [selectedRol, setSelectedRol] = useState<{
    allRols: Record<string, string> | null;
    userId: string | null;
    newRol: string | null;
  }>({
    allRols: null,
    userId: null,
    newRol: null,
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [users] = trpc.user.getAllUsers.useSuspenseQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const sortedOrders = useMemo(() => {
    return [...users].sort((a:any, b:any) => {
      const key = sortConfig.key;
      if (a[key] < b[key]) return sortConfig.direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });
  }, [sortConfig, users]);

  const handleSort = (key: keyof User) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {HEADERS_TABLE.map((header) => (
              <TableHead key={header.value}>
                <Button
                  onClick={() => handleSort(header.value)}
                  type="button"
                  variant="ghost"
                >
                  <span>{header.label}</span>
                  {sortConfig.key === header.value &&
                  sortConfig.direction === "ascending" ? (
                    <FaArrowDownShortWide className="text-base ml-1" />
                  ) : (
                    <FaArrowUpWideShort className="text-base ml-1" />
                  )}
                </Button>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedOrders?.map((user) => (
            <TableRow key={user.id} className="text-center">
              <TableCell className="text-ellipsis">{user.firstName}</TableCell>
              <TableCell className="text-left text-ellipsis">
                {user.lastName}
              </TableCell>
              <TableCell className="text-left text-ellipsis">
                {user.email}
              </TableCell>
              <TableCell className="text-left text-ellipsis">
                {user.provider}
              </TableCell>
              <TableCell className="text-left text-ellipsis">
                {user.phonenumber}
              </TableCell>
              <TableCell className="text-left text-ellipsis">
                <select
                  value={
                    selectedRol.allRols?.[user.id!] 
                  }
                  onChange={(e) => {
                    setIsDialogOpen(true);
                    setSelectedRol({
                      ...selectedRol,
                      newRol: e.target.value,
                      userId: user.id!,
                    });
                  }}
                  className="w-[180px] p-2 border border-gray-300 rounded-md"
                >
                  {USERS_ROL.map((rol) => (
                    <option key={rol} value={rol}>
                      {rol}
                    </option>
                  ))}
                </select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DialogChangeRol
        selectedRol={selectedRol}
        isDialogOpen={isDialogOpen}
        setSelectedRol={setSelectedRol}
        setIsDialogOpen={setIsDialogOpen}
      />
    </div>
  );
};

export default UsersList;
