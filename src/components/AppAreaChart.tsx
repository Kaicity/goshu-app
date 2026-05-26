'use client';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const chartConfig = {
  revenue: {
    label: 'Doanh thu',
    color: 'var(--chart-2)',
  },
  expense: {
    label: 'Chi phí',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

const chartData = [
  { month: 'January', revenue: 125000000, expense: 45000000 },
  { month: 'February', revenue: 148000000, expense: 52000000 },
  { month: 'March', revenue: 132000000, expense: 48000000 },
  { month: 'April', revenue: 165000000, expense: 61000000 },
  { month: 'May', revenue: 178000000, expense: 70000000 },
  { month: 'June', revenue: 178000000, expense: 70000000 },
];

const AppAreaChart = () => {
  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">Thống kê doanh thu & chi phí</h1>
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <AreaChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
          <YAxis tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => `${value / 1000000}M`} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <defs>
            <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-expense)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-expense)" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area
            dataKey="expense"
            type="natural"
            fill="url(#fillExpense)"
            fillOpacity={0.4}
            stroke="var(--color-expense)"
            stackId="a"
          />
          <Area
            dataKey="revenue"
            type="natural"
            fill="url(#fillRevenue)"
            fillOpacity={0.4}
            stroke="var(--color-revenue)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

export default AppAreaChart;
