'use client'
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { formatDateToLocal, formatPrice } from "@/lib/utils/utils";
import { trpc } from "@/lib/trpc/client";
import Link from "next/link";
export default function TopRecentOrders() {
    const [orders]=trpc.order.getOrder.useSuspenseQuery({limit:3},{
        refetchOnMount:false,
        refetchOnWindowFocus:false
    })
  return (
    <div className="overflow-x-scroll overflow-hidden">
    <Table className=" overflow-x-scroll">
      <TableHeader>
        <TableRow>
          <TableHead>
            <Button type="button" variant="ghost">
              <span>Usuario</span>
            </Button>
          </TableHead>
          <TableHead>
            <Button type="button" variant="ghost">
              <span>Total</span>
            </Button>
          </TableHead>
          <TableHead>
            <Button type="button" variant="ghost">
              <span>Estado</span>
            </Button>
          </TableHead>
          <TableHead>
            <Button type="button" variant="ghost">
              <span>Tipo de delivery</span>
            </Button>
          </TableHead>
          <TableHead>
            <Button type="button" variant="ghost">
              <span>Fecha preferida</span>
            </Button>
          </TableHead>
          <TableHead>
            <Button type="button" variant="ghost">
              <span>Metodo de pago</span>
            </Button>
          </TableHead>
          <TableHead>
            <Button type="button" variant="ghost">
              <span>Fecha de creacion</span>
            </Button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders?.map((order) => (
        <TableRow key={order?.id} className="text-center">
          <TableCell className="text-ellipsis">
            {order?.user?.firstName}
          </TableCell>
          <TableCell className="text-ellipsis">
          <p className="text-xs font-semibold text-nowrap">
                Total: <span>{formatPrice(order?.total!)}</span>
              </p>
          </TableCell>
          <TableCell className="text-center">
            <p>{order.status}</p>
          </TableCell>
     
          <TableCell className="text-center text-ellipsis">
            {order?.deliveryType}
          </TableCell>
          <TableCell className="text-center text-nowrap text-ellipsis">
            {order?.scheduledDate ? (
              formatDateToLocal(order?.scheduledDate)
            ) : (
              <span>No definido</span>
            )}
          </TableCell>
          <TableCell className="text-center text-ellipsis">
            {order?.paymentMethod}
          </TableCell>
          <TableCell className="text-center text-ellipsis text-nowrap">
            {formatDateToLocal(order?.createdAt!)}
          </TableCell>
        </TableRow>
      ))}
      </TableBody>
    </Table>
    <div className="m-auto w-fit">
      <Button variant="link" size="sm" asChild className="m-auto">
        <Link href="dashboard/orders">Ver todos</Link>
      </Button>
    </div>
  </div>  )
}
