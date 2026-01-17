'use client';

import { getAvailablePayrollYear, getSalaryRatio, getSalaryStructureByMonth } from '@/api/payrolls/payroll-report';
import AppAreaChart from '@/components/AppAreaChart';
import AppBarChart from '@/components/AppBarChart';
import { AppPieChart } from '@/components/AppPieChart';
import ProtectPage from '@/components/auth/ProtectPage';
import CardReport from '@/components/CardReport';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import TodoList from '@/components/TodoList';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { ChartConfig } from '@/components/ui/chart';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useApp } from '@/contexts/AppContext';
import { buildPayrollChartData } from '@/helpers/chart-data-map';
import { ChevronDown, UserCheck, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

const Homepage = () => {
  const { setUserAccount } = useApp();

  // REPORT CHART
  const [lineChartData, setLineChartData] = useState<any[]>([]);
  const [stacked, setStacked] = useState<boolean>(false);

  const [ratioChartData, setRatioChartData] = useState<any[]>([]);

  const [years, setYears] = useState<number[]>([]);
  const [year, setYear] = useState<number>();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserAccount(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchYears = async () => {
      const res = await getAvailablePayrollYear();
      setYears(res);
      setYear(years[0]);
    };

    fetchYears();
  }, []);

  useEffect(() => {
    const fetchReportSalaryStructureByYear = async () => {
      const res = await getSalaryStructureByMonth(year ?? new Date().getFullYear());

      const data = buildPayrollChartData(res);
      setLineChartData(data);
    };

    fetchReportSalaryStructureByYear();
  }, [year]);

  useEffect(() => {
    const fetchReportSalaryRatio = async () => {
      const res = await getSalaryRatio(1, 2026);
      console.log(res);

      setRatioChartData(res);
    };

    fetchReportSalaryRatio();
  }, [year]);

  return (
    <div className="space-y-6 py-4">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-chart-1 to-chart-2 p-6 text-primary-foreground">
        <div className="relative z-10">
          <h1 className="text-2xl mb-2">Chào buổi sáng, Nguyễn Minh Thông! 👋</h1>
          <p className="text-primary-foreground/80 mb-4">Hãy làm sản phẩm chất lượng và tâm huyết nhất với cộng đồng.</p>
          <div className="flex flex-wrap gap-4">
            <Badge className="bg-white/20 text-primary-foreground border-0">
              <Users className="w-4 h-4 mr-2" />
              {1000} Tổng nhân viên
            </Badge>
            <Badge className="bg-white/20 text-primary-foreground border-0">
              <UserCheck className="w-4 h-4 mr-2" />
              {200} Ngày hoạt động
            </Badge>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-32 opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1594892342285-9b86df3ad47a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB0ZWFtJTIwd29ya3NwYWNlfGVufDF8fHx8MTc1ODc2ODAyNXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Team workspace"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
        <div className="lg:col-span-2 xl:col-span-1 2xl:col-span-2">
          <div className="lg:col-span-2 2xl:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
              {[1, 2, 3, 4].map((_, i) => (
                <CardReport
                  key={i}
                  title="Bảng lương gần đây nhất"
                  value="578,000,000 VND"
                  percentage={2.4}
                  icon={<Users className="h-6 w-6 text-blue-600" />}
                  cardItemClassName="bg-blue-50"
                  cardHeight="h-34"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 2xl:col-span-2">
          <AppAreaChart />
        </div>

        <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
          <AppBarChart
            title="Biểu đồ thống kê lương nhân viên"
            desTitle={`Tháng 1 - Tháng 12 ${new Date().getFullYear()}`}
            chartData={lineChartData}
            bars={[
              { key: 'netSalary', label: 'Tổng lương', color: 'var(--chart-3)' },
              { key: 'deductions', label: 'Khấu trừ', color: 'var(--chart-4)' },
            ]}
            chartConfig={
              {
                netSalary: { label: 'Tổng lương' },
                deductions: { label: 'Khấu trừ' },
              } satisfies ChartConfig
            }
            yearSelected={
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {year}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  {years.map((y) => (
                    <DropdownMenuItem
                      key={y}
                      onClick={() => setYear(y)}
                      className={y === year ? 'font-semibold text-primary' : ''}
                    >
                      {y}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            }
            stacked={stacked}
            onchangeStacked={() => setStacked((prev) => !prev)}
          />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg">
          <TodoList />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg">
          <AppPieChart />
        </div>
      </div>
    </div>
  );
};

export default ProtectPage(Homepage);
