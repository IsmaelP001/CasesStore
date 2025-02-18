"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { trpc } from "@/lib/trpc/client";

const chartConfig = {
  total: {
    label: "Total",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const MONTHS_LIST = [
  { value: 1, label: "Enero", total: 0 },
  { value: 2, label: "Febrero", total: 0 },
  { value: 3, label: "Marzo", total: 0 },
  { value: 4, label: "Abril", total: 0 },
  { value: 5, label: "Mayo", total: 0 },
  { value: 6, label: "Junio", total: 0 },
  { value: 7, label: "Julio", total: 0 },
  { value: 8, label: "Agosto", total: 0 },
  { value: 9, label: "Septiembre", total: 0 },
  { value: 10, label: "Octubre", total: 0 },
  { value: 11, label: "Noviembre", total: 0 },
  { value: 12, label: "Diciembre", total: 0 },
];

export default function ChartOrders() {


  const [orders]=trpc.order.getMonthlyOrdersTotal.useSuspenseQuery(undefined,{
    refetchOnMount:false,
    refetchOnWindowFocus:false
  })

  const chartData = MONTHS_LIST.slice(0, new Date().getMonth() + 1).map(
    ({ label, value, total }) => {
      const monthTotal = orders?.find((item) => item.month === value);
      return {
        month: label,
        total: monthTotal ? monthTotal.totalPerMonth : total,
      };
    }
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Line Chart - Orders</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="min-h-[100px] max-h-[180px] m-auto w-full "
          config={chartConfig}
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="total"
              type="natural"
              stroke="var(--color-total)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-total)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
