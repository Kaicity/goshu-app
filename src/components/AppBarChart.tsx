'uses client';

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { ChartBar, ChartBarStacked, ChevronDown } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { useState } from 'react';

export interface BarChartData {
  label: string;
  [key: string]: number | string;
}

export interface BarItem {
  key: string;
  label: string;
  color: string;
}

interface AppBarChartProps {
  title: string;
  desTitle?: string;
  chartData: BarChartData[];
  bars: BarItem[];
  stacked?: boolean;
  chartConfig: ChartConfig;
  onchangeStacked?: () => void;
}

const AppBarChart = ({ title, desTitle, chartData, bars, chartConfig, stacked, onchangeStacked }: AppBarChartProps) => {
  const [year, setYear] = useState(2025);

  return (
    <div>
      <div className="flex items-start justify-between">
        <h1 className="mb-6">
          <span className="text-lg font-medium">{title}</span>
          {desTitle && <span className="block text-sm text-muted-foreground">{desTitle}</span>}
        </h1>

        <div className="flex items-center gap-2">
          <Button variant="default" size="lg" onClick={onchangeStacked}>
            {stacked ? <ChartBarStacked /> : <ChartBar />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="xl">
                {year}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {[2025, 2026, 2027].map((y) => (
                <DropdownMenuItem key={y} onClick={() => setYear(y)} className={y === year ? 'font-semibold text-primary' : ''}>
                  {y}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="label" tickLine={false} tickMargin={10} axisLine={false} />
          <YAxis tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />

          {bars.map((bar) => (
            <Bar key={bar.key} dataKey={bar.key} fill={bar.color} radius={[4, 4, 0, 0]} stackId={stacked ? 'total' : undefined} />
          ))}
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default AppBarChart;
