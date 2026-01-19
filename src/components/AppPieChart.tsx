'use client';

import { TrendingUp } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';

import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

export const description = 'A pie chart with a label';

const chartData = [
  { status: 'Completed', value: 58, fill: 'var(--chart-1)' },
  { status: 'In Progress', value: 22, fill: 'var(--chart-2)' },
  { status: 'Blocked', value: 12, fill: 'var(--chart-3)' },
  { status: 'Overdue', value: 8, fill: 'var(--chart-4)' },
];

const chartConfig = {
  value: {
    label: 'Tasks',
  },
  Completed: {
    label: 'Hoàn thành',
    color: 'var(--chart-1)',
  },
  'In Progress': {
    label: 'Đang làm',
    color: 'var(--chart-2)',
  },
  Blocked: {
    label: 'Bị chặn',
    color: 'var(--chart-3)',
  },
  Overdue: {
    label: 'Quá hạn',
    color: 'var(--chart-4)',
  },
} satisfies ChartConfig;

export function AppPieChart() {
  const totalTasks = chartData.reduce((sum, i) => sum + i.value, 0);
  const completed = chartData.find((i) => i.status === 'Completed')?.value ?? 0;

  return (
    <div className="rounded-2xl bg-primary-foreground">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Team Performance</h2>
        <p className="text-sm text-muted-foreground">Tình trạng công việc của team trong tháng này</p>
      </div>

      {/* Chart */}
      <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[240px]">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Pie data={chartData} dataKey="value" nameKey="status" innerRadius={90} outerRadius={115} strokeWidth={4}>
            <Label
              content={({ viewBox }) => {
                if (!viewBox || !('cx' in viewBox)) return null;

                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                    <tspan className="text-3xl font-bold fill-foreground">{completed}%</tspan>
                    <tspan x={viewBox.cx} dy={22} className="text-sm fill-muted-foreground">
                      Hoàn thành
                    </tspan>
                  </text>
                );
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        {chartData.map((item) => (
          <div key={item.status} className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.fill }} />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{item.status}</span>
              <span className="text-xs text-muted-foreground">{item.value}% công việc</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer insight */}
      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-green-600">
        Hiệu suất tăng 5.2% so với tháng trước
        <TrendingUp className="h-4 w-4" />
      </div>
    </div>
  );
}
