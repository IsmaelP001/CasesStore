"use client";

import { FaArrowUpWideShort, FaArrowDownShortWide } from "react-icons/fa6";
import { formatDateToLocal, formatPrice } from "../../../../lib/utils/utils";
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
import DialogChangeStatus from "./DialogChangeStatus";
import { trpc } from "@/lib/trpc/client";

// Define the possible status options
const STATUS_ORDERS = [
  "pendiente",
  "pagado",
  "enviado",
  "entregado",
  "cancelado",
  "reembolsado",
  "retornado",
] as const;

// Order and user types
interface User {
  id: string;
  firstName: string;
  lastName: string;
}

interface Order {
  id: string;
  user: User;
  grossTotal: number;
  shipping: number;
  itebis: number;
  total: number;
  status: (typeof STATUS_ORDERS)[number];
  deliveryType: string;
  scheduledDate: string | null;
  paymentMethod: string;
  createdAt: string;
}

// Sort configuration
interface SortConfig {
  key: keyof Order;
  direction: "ascending" | "descending";
}

// Selected status state type
interface SelectedStatus {
  status: { [orderId: string]: string } | null;
  orderId: string | null;
  newStatus: string | null;
}

const OrderList = () => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "user",
    direction: "ascending",
  });

  const [selectedStatus, setSelectedStatus] = useState<SelectedStatus>({
    status: null,
    orderId: null,
    newStatus: null,
  });

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const { data: orders, isPending } = trpc.order.getOrder.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const sortedOrders = useMemo(() => {
    if (isPending || !orders) return [];
    return [...orders!].sort((a, b) => {
      if (a[sortConfig.key]! < b[sortConfig.key]!) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key]! > b[sortConfig.key]!) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }, [sortConfig, orders]);

  const handleSort = (key: keyof Order) => {
    let direction: SortConfig["direction"] = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="overflow-x-scroll">
      <Table className=" overflow-x-scroll">
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button
                onClick={() => handleSort("user")}
                type="button"
                variant="ghost"
              >
                <span>Usuario</span>
                {sortConfig.key === "user" &&
                sortConfig.direction === "ascending" ? (
                  <FaArrowDownShortWide className="text-base ml-1" />
                ) : (
                  <FaArrowUpWideShort className="text-base ml-1" />
                )}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                onClick={() => handleSort("total")}
                type="button"
                variant="ghost"
              >
                <span>Total</span>
                {sortConfig.key === "total" &&
                sortConfig.direction === "ascending" ? (
                  <FaArrowDownShortWide className="text-base ml-1" />
                ) : (
                  <FaArrowUpWideShort className="text-base ml-1" />
                )}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                onClick={() => handleSort("status")}
                type="button"
                variant="ghost"
              >
                <span>Estado</span>
                {sortConfig.key === "status" &&
                sortConfig.direction === "ascending" ? (
                  <FaArrowDownShortWide className="text-base ml-1" />
                ) : (
                  <FaArrowUpWideShort className="text-base ml-1" />
                )}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                onClick={() => handleSort("deliveryType")}
                type="button"
                variant="ghost"
              >
                <span>Tipo de delivery</span>
                {sortConfig.key === "deliveryType" &&
                sortConfig.direction === "ascending" ? (
                  <FaArrowDownShortWide className="text-base ml-1" />
                ) : (
                  <FaArrowUpWideShort className="text-base ml-1" />
                )}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                onClick={() => handleSort("scheduledDate")}
                type="button"
                variant="ghost"
              >
                <span>Fecha preferida</span>
                {sortConfig.key === "scheduledDate" &&
                sortConfig.direction === "ascending" ? (
                  <FaArrowDownShortWide className="text-base ml-1" />
                ) : (
                  <FaArrowUpWideShort className="text-base ml-1" />
                )}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                onClick={() => handleSort("paymentMethod")}
                type="button"
                variant="ghost"
              >
                <span>Metodo de pago</span>
                {sortConfig.key === "paymentMethod" &&
                sortConfig.direction === "ascending" ? (
                  <FaArrowDownShortWide className="text-base ml-1" />
                ) : (
                  <FaArrowUpWideShort className="text-base ml-1" />
                )}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                onClick={() => handleSort("createdAt")}
                type="button"
                variant="ghost"
              >
                <span>Fecha de creacion</span>
                {sortConfig.key === "createdAt" &&
                sortConfig.direction === "ascending" ? (
                  <FaArrowDownShortWide className="text-base ml-1" />
                ) : (
                  <FaArrowUpWideShort className="text-base ml-1" />
                )}
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedOrders?.map((order) => (
            <TableRow key={order?.id} className="text-center">
              <TableCell className="text-ellipsis">
                {order?.user?.firstName}
              </TableCell>
              <TableCell className="text-ellipsis">
                <div className="text-left">
                  <p className="text-xs font-medium text-nowrap">
                    Total bruto: <span>{formatPrice(order?.grossTotal)}</span>
                  </p>
                  <p className="text-xs font-medium text-nowrap">
                    Envio: <span>{formatPrice(order?.shipping)}</span>
                  </p>
                  <p className="text-xs font-medium text-nowrap">
                    Itebis: <span>{formatPrice(order?.itebis)}</span>
                  </p>
                  <p className="text-xs font-semibold text-nowrap">
                    Total: <span>{formatPrice(order?.total)}</span>
                  </p>
                </div>
              </TableCell>
              <TableCell className="text-left text-ellipsis">
                <select
                  value={
                    selectedStatus?.status?.hasOwnProperty(order?.id)
                      ? selectedStatus?.status[order?.id]
                      : order?.status
                  }
                  onChange={(e) => {
                    setIsDialogOpen(true);
                    setSelectedStatus({
                      ...selectedStatus,
                      newStatus: e.target.value,
                      orderId: order?.id,
                    });
                  }}
                  className="w-[180px] p-2 border border-gray-300 rounded-md"
                >
                  {STATUS_ORDERS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </TableCell>
              <TableCell className="text-left text-ellipsis">
                {order?.deliveryType}
              </TableCell>
              <TableCell className="text-left text-nowrap text-ellipsis">
                {order?.scheduledDate ? (
                  formatDateToLocal(order?.scheduledDate)
                ) : (
                  <span>No definido</span>
                )}
              </TableCell>
              <TableCell className="text-left text-ellipsis">
                {order?.paymentMethod}
              </TableCell>
              <TableCell className="text-left text-ellipsis text-nowrap">
                {formatDateToLocal(order?.createdAt!)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DialogChangeStatus
        selectedStatus={selectedStatus}
        isDialogOpen={isDialogOpen}
        setSelectedStatus={setSelectedStatus}
        setIsDialogOpen={setIsDialogOpen}
      />
    </div>
  );
};

export default OrderList;
