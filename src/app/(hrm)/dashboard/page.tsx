'use client';

import { getDashBoardReportSummary } from '@/api/dashboard/dashboard-report';
import { getDepartments } from '@/api/departments/department';
import { getEmployees } from '@/api/employee/employee';
import { getAvailablePayrollYear, getSalaryStructureByMonth } from '@/api/payrolls/payroll-report';
import AppAreaChart from '@/components/AppAreaChart';
import AppBarChart from '@/components/AppBarChart';

import ProtectPage from '@/components/auth/ProtectPage';
import CardReport from '@/components/CardReport';
import { DataTable } from '@/components/DataTable';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { MultiSelect } from '@/components/MultiSelect';
import TodoList from '@/components/TodoList';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ChartConfig } from '@/components/ui/chart';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useApp } from '@/contexts/AppContext';
import { EMPLOYEE_STATUS_LABELS, EmployeeStatus } from '@/enums/employeeEnum';
import { TypeWork, TYPEWORK_LABELS } from '@/enums/typeWorkEnum';
import { UserRole } from '@/enums/userRolesEnum';
import { buildPayrollChartData } from '@/helpers/chart-data-map';
import type { DashboardSummary } from '@/models/dto/dashboard-summary';
import type { DepartmentDto } from '@/models/dto/departmentDto';
import type { EmployeeDto } from '@/models/dto/employeeDto';
import { Briefcase, ChevronDown, Search, UserCheck, UserMinus, UserPlus, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { columns } from './columns';

const Homepage = () => {
  type DepartmentOption = {
    label: string;
    value: string;
  };

  const { setUserAccount } = useApp();

  const [employees, setEmployees] = useState<EmployeeDto[]>([]);

  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState<DepartmentDto[]>([]);
  const [departmentsFilter, setDepartmentsFilter] = useState<DepartmentOption[]>([]);
  const [statusSelected, setStatusSelected] = useState<string[]>([]);
  const [departmentSelected, setDepartmentSelected] = useState<string[]>([]);
  const [typeWorkSelected, setTypeWorkSelected] = useState<string[]>([]);

  // REPORT CHART
  const [lineChartData, setLineChartData] = useState<any[]>([]);
  const [stacked, setStacked] = useState<boolean>(false);

  const [ratioChartData, setRatioChartData] = useState<any[]>([]);

  const [years, setYears] = useState<number[]>([]);
  const [year, setYear] = useState<number>();

  const [dashboardSummary, setDashboardSummary] = useState<DashboardSummary | null>(null);

  useEffect(() => {
    const fetchDashboardSummary = async () => {
      const now = new Date();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();

      const res = await getDashBoardReportSummary(month, year);
      setDashboardSummary(res);
    };

    fetchDashboardSummary();
  }, []);

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
    fetchEmployees();
  }, [page, limit, search, departmentSelected, typeWorkSelected, statusSelected]);

  useEffect(() => {
    fetchDepartments();

    setDepartmentsFilter(
      Object.values(departments).map((dept) => ({
        label: dept.name,
        value: dept.id!,
      })),
    );
  }, [departments]);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await getEmployees(page, limit, {
        search,
        departments: departmentSelected,
        typeWorks: typeWorkSelected,
        status: statusSelected,
      });
      setEmployees(res.employees);
      setTotal(res.pagination.total);
      setLimit(res.pagination.limit);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await getDepartments(1, 100, { search: '' });
      setDepartments(res.departments);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handlePaginationChange = (newPage: number, newLimit: number) => {
    setPage(newPage);
    setLimit(newLimit);
  };

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
              <CardReport
                title="Tổng nhân viên"
                value={dashboardSummary?.totalEmployees.value ?? 0}
                percentage={dashboardSummary?.totalEmployees.percent ?? 0}
                icon={<Users className="h-6 w-6 text-blue-600" />}
                cardItemClassName="bg-blue-50"
                cardHeight="h-34"
              />

              <CardReport
                title="Nhân viên mới"
                value={dashboardSummary?.newEmployees.value ?? 0}
                percentage={dashboardSummary?.newEmployees.percent ?? 0}
                icon={<UserPlus className="h-6 w-6 text-green-600" />}
                cardItemClassName="bg-green-50"
                cardHeight="h-34"
              />

              <CardReport
                title="Nhân viên nghỉ việc"
                value={dashboardSummary?.resignedEmployees.value ?? 0}
                percentage={dashboardSummary?.resignedEmployees.percent ?? 0}
                icon={<UserMinus className="h-6 w-6 text-red-600" />}
                cardItemClassName="bg-red-50"
                cardHeight="h-34"
              />

              <CardReport
                title="Ứng viên"
                value={0}
                percentage={0}
                icon={<Briefcase className="h-6 w-6 text-purple-600" />}
                cardItemClassName="bg-purple-50"
                cardHeight="h-34"
              />
            </div>
          </div>
        </div>

        <div className="bg-secondary p-4 rounded-lg lg:col-span-2 2xl:col-span-2">
          <AppAreaChart />
        </div>

        <div className="lg:col-span-2 2xl:col-span-3">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-lg">Nhân Viên</CardTitle>
              <CardAction>
                <div className="relative max-w-sm sm:w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    placeholder="Tìm nhân viên"
                    className="pl-10"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                  />
                </div>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 pb-4">
                <MultiSelect
                  options={Object.entries(EmployeeStatus).map(([__, value]) => ({
                    label: EMPLOYEE_STATUS_LABELS[value],
                    value: value,
                  }))}
                  value={statusSelected}
                  onValueChange={(values) => {
                    setStatusSelected(values);
                    setPage(1);
                  }}
                  placeholder="Tất cả trạng thái"
                  className="relative justify-start px-4"
                />
                <MultiSelect
                  options={Object.entries(TypeWork).map(([__, value]) => ({
                    label: TYPEWORK_LABELS[value],
                    value,
                  }))}
                  value={typeWorkSelected}
                  onValueChange={(values) => {
                    setTypeWorkSelected(values);
                    setPage(1);
                  }}
                  placeholder="Tất cả loại hình"
                  className="relative justify-start px-4"
                />
                <MultiSelect
                  options={departmentsFilter}
                  value={departmentSelected}
                  onValueChange={(values) => {
                    setDepartmentSelected(values);
                    setPage(1);
                  }}
                  placeholder="Tất cả phòng ban"
                  className="relative justify-start px-4"
                />
              </div>

              <DataTable
                columns={columns}
                data={employees}
                page={page}
                limit={limit}
                total={total}
                onPaginationChange={handlePaginationChange}
                loading={loading}
              />
            </CardContent>
          </Card>
        </div>

        <div className="bg-secondary p-4 rounded-lg">
          <TodoList />
        </div>

        <div className="bg-secondary p-4 rounded-lg lg:col-span-2 2xl:col-span-4">
          <AppBarChart
            title="Biểu đồ thống kê lương nhân viên"
            desTitle={`Tháng 1 - Tháng 12 ${new Date().getFullYear()}`}
            chartData={lineChartData}
            bars={[
              { key: 'netSalary', label: 'Tổng lương', color: 'var(--chart-1)' },
              { key: 'deductions', label: 'Khấu trừ', color: 'var(--chart-3)' },
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
      </div>
    </div>
  );
};

export default ProtectPage(Homepage, { allowedRoles: [UserRole.HR, UserRole.EMPLOYEE, UserRole.ADMIN] });
