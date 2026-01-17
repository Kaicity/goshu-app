'use client';

import { completePayroll, generatePayrollAllEmployees, getPayrolls } from '@/api/payrolls/payroll';
import { getAvailablePayrollYear, getSalaryRatio, getSalaryStructureByMonth } from '@/api/payrolls/payroll-report';
import AppBarChart from '@/components/AppBarChart';
import AppPieChart from '@/components/AppPieChart';
import CardReport from '@/components/CardReport';
import { DataTable } from '@/components/DataTable';
import { HeaderTitle } from '@/components/HeaderTitle';
import LoadingActionPage from '@/components/LoadingActionPage';
import { MultiSelect } from '@/components/MultiSelect';
import StackCardMessage from '@/components/StackCardMessage';
import { Button } from '@/components/ui/button';
import type { ChartConfig } from '@/components/ui/chart';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Payroll, PAYROLL_LABELS } from '@/enums/payrollEnum';
import { buildPayrollChartData } from '@/helpers/chart-data-map';
import { useActionWithLoading } from '@/hooks/useExecute';
import { PayrollDto } from '@/models/dto/payrollDto';
import {
  ChevronDown,
  CircleArrowOutUpLeft,
  Download,
  HandCoins,
  Loader,
  RotateCcwIcon,
  Search,
  UserPlus,
  Users,
  UserX,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { columns } from './columns';
import EditPayrollSheet from './EditPayrollSheet';

const PayrollsPage = () => {
  const { isLoadingAction, execute } = useActionWithLoading();

  // BASE
  const [payrolls, setpayrolls] = useState<PayrollDto[]>([]);
  const [payroll, setPayroll] = useState<PayrollDto>();
  const [search, setSearch] = useState<string>('');

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const [statusSelected, setStatusSelected] = useState<string[]>([]);

  // REPORT CHART
  const [chartData, setChartData] = useState<any[]>([]);
  const [stacked, setStacked] = useState<boolean>(false);

  const [years, setYears] = useState<number[]>([]);
  const [year, setYear] = useState<number>();

  const [openEditSheet, setOpenEditSheet] = useState<boolean>(false);

  type PayrollStatusUI = 'generated' | 'completed';
  const [statusPayroll, setStatusPayroll] = useState<PayrollStatusUI>('generated');

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
      setChartData(data);
    };

    fetchReportSalaryStructureByYear();
  }, [year]);

  useEffect(() => {
    const fetchReportSalaryRatio = async () => {
      const res = await getSalaryRatio(1, 2026);

      console.log(res);
    };

    fetchReportSalaryRatio();
  }, [year]);

  useEffect(() => {
    fetchPayrolls();
  }, [page, limit, search, statusSelected]);

  useEffect(() => {
    const hasOpenPayroll = payrolls.some((p) => p.payroll.status !== Payroll.CLOSED);

    if (hasOpenPayroll) {
      setStatusPayroll('generated');
    } else {
      setStatusPayroll('completed');
    }
  }, [payrolls]);

  const fetchPayrolls = async () => {
    setLoading(true);
    try {
      const res = await getPayrolls(page, limit, { search, status: statusSelected });
      setpayrolls(res.payrolls);
      setTotal(res.pagination.total);
      setLimit(res.pagination.limit);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePaginationChange = (newPage: number, newLimit: number) => {
    setPage(newPage);
    setLimit(newLimit);
  };

  const handleGeneratePayrolls = async () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    execute(
      async () => {
        if (year && month) {
          await generatePayrollAllEmployees(year, month);
          fetchPayrolls();
        }
      },
      {
        successMessage: 'Bảng lương đã tạo thành công',
      },
    );
  };

  const resetFilter = () => {
    setSearch('');
    setStatusSelected([]);
    fetchPayrolls();
  };

  const handleUpdate = (resource: PayrollDto) => {
    if (resource) {
      setOpenEditSheet(true);
      setPayroll(resource);
    }
  };

  const handleCompleteSalary = async () => {
    execute(
      async () => {
        await completePayroll();
        fetchPayrolls();
      },
      {
        successMessage: 'Đã hoàn tất chốt kỳ lương này',
      },
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {isLoadingAction && <LoadingActionPage />}

      <HeaderTitle text="QUẢN LÝ BẢNG LƯƠNG" subText="Quản lý lương của nhân viên" />
      <StackCardMessage title="Vui lòng kiểm tra thống kê lại lương tháng vừa rồi trước khi thực hiện thao tác tạo lập bảng lương mới" />
      <div className="flex items-center gap-2 justify-end">
        <Button variant="secondary" onClick={() => {}}>
          <Download className="w-5 h-5 mr-2" />
          Xuất bản ghi
        </Button>
        <Button onClick={handleGeneratePayrolls}>
          <HandCoins className="w-4 h-4 mr-2" />
          Tạo bảng lương
        </Button>

        <Button variant="outline" onClick={handleCompleteSalary} disabled={statusPayroll !== 'generated'}>
          <CircleArrowOutUpLeft className="w-4 h-4 mr-2" />
          Hoàn tất lương
        </Button>
      </div>
      {/* CARD REVIEWS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <CardReport
          title="Bảng lương gần đây nhất"
          value="578,000,000 VND"
          percentage={2.4}
          icon={<Users className="h-5 w-5 text-blue-600" />}
          cardItemClassName="bg-blue-50"
        />
        <CardReport
          title="Nhân viên có trong bảng lương"
          value="280"
          percentage={-10}
          icon={<UserPlus className="h-5 w-5 text-yellow-500" />}
          cardItemClassName="bg-yellow-50"
        />
        <CardReport
          title="Đang chờ phê duyệt lương"
          value="10"
          icon={<Loader className="h-5 w-5 text-orange-500" />}
          cardItemClassName="bg-orange-50"
        />
        <CardReport
          title="Ngày trả lương kế tiếp"
          value="05 Tháng 01 2025"
          percentage={2.4}
          icon={<UserX className="h-5 w-5 text-red-500" />}
          cardItemClassName="bg-red-50"
        />
      </div>

      {/* CHART REPORT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
        <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-3">
          <AppBarChart
            title="Biểu đồ thống kê lương nhân viên"
            desTitle={`Tháng 1 - Tháng 12 ${new Date().getFullYear()}`}
            chartData={chartData}
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
          <AppPieChart data={salaryStructure} title="Cơ cấu lương tháng 12" />
        </div>
      </div>

      {/* PAYROLLS LIST */}
      <div>
        <HeaderTitle text="Bảng lương" subText="Bảng danh sách lương nhân viên" />
        <div className="flex flex-wrap items-center gap-2 mb-6 mt-2">
          <div className="hidden md:block relative max-w-sm sm:w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Tìm kiếm theo họ tên nhân viên hoặc mã nhân viên..."
              className="max-w-sm sm:w-full pl-10"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          <MultiSelect
            options={Object.entries(Payroll).map(([__, value]) => ({
              label: PAYROLL_LABELS[value],
              value,
            }))}
            value={statusSelected}
            onValueChange={(values) => {
              setStatusSelected(values);
              setPage(1);
            }}
            placeholder="Chọn trạng thái"
            className="relative justify-start px-4 w-full md:w-auto"
          />
          <Button onClick={resetFilter}>
            <RotateCcwIcon className="w-6 h-6" />
            Làm mới
          </Button>
        </div>

        <DataTable
          columns={columns(handleUpdate)}
          data={payrolls}
          page={page}
          limit={limit}
          total={total}
          onPaginationChange={handlePaginationChange}
          loading={loading}
        />
      </div>
      <EditPayrollSheet open={openEditSheet} setOpen={setOpenEditSheet} payrollData={payroll} reloadData={fetchPayrolls} />
    </div>
  );
};

export default PayrollsPage;
