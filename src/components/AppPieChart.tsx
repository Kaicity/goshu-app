'use client';

import { Label, Pie, PieChart } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { TrendingUp } from 'lucide-react';

const chartConfig = {
  chrome: {
    label: 'Chrome',
    color: 'var(--chart-3)',
  },
  safari: {
    label: 'Safari',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

const chartData = [
  { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
];

const COLORS = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)'];

interface PieItem {
  name: string;
  value: number;
}

interface AppPieChartProps {
  data: PieItem[];
  title?: string;
}

const AppPieChart = ({ data, title = 'Cơ cấu lương' }: AppPieChartProps) => {
  const chartData = data
    .filter((item) => item.value > 0) // ẩn value = 0
    .map((item, index) => ({
      label: item.name,
      amount: item.value,
      fill: COLORS[index],
    }));

  const total = chartData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="flex flex-col">
      <h1 className="text-lg font-medium mb-4">{title}</h1>

      <ChartContainer config={{}} className="mx-auto aspect-square max-h-[260px]">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent />} />

          <Pie data={chartData} dataKey="amount" nameKey="label" innerRadius={90} outerRadius={120}>
            <Label
              content={({ viewBox }) =>
                viewBox &&
                'cx' in viewBox &&
                'cy' in viewBox && (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                    <tspan className="fill-foreground text-2xl font-bold">{total.toLocaleString()} VNĐ</tspan>
                    <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 22} className="fill-muted-foreground text-sm">
                      Tổng cộng
                    </tspan>
                  </text>
                )
              }
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
};

export default AppPieChart;
