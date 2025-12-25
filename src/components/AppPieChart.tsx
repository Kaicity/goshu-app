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

const AppPieChart = () => {
  // If you don't use React compiler use useMemo hook to improve performance
  const totalVisitors = chartData.reduce((acc, curr) => acc + curr.visitors, 0);

  return (
    <div>
      <h1 className="text-lg font-medium mb-6">Browser Usage</h1>
      <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie data={chartData} dataKey="visitors" nameKey="browser" innerRadius={100} outerRadius={120} strokeWidth={5}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                        {totalVisitors.toLocaleString()}
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                        Tổng cộng
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="mt-4 flex flex-col gap-2 items-center">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="w-2 bg-chart-3 rounded-lg self-stretch" />
            <div className="flex flex-col justify-between gap-4">
              <h2 className="font-medium">3,000,000 VNĐ</h2>
              <h4 className="text-muted-foreground">Khoản vay</h4>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex flex-col justify-between gap-4">
              <h2 className="font-medium">1,000,000 VNĐ</h2>
              <h4 className="text-muted-foreground">Khoản vay</h4>
            </div>
            <div className="w-2 bg-chart-2 rounded-lg self-stretch" />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 items-center">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="leading-none text-muted-foreground">Showing total visitors for the last 6 months</div>
      </div>
    </div>
  );
};

export default AppPieChart;
