'use client';

import { getEmployees } from '@/api/employee/employee';
import AppBarChart from '@/components/AppBarChart';
import AppPieChart from '@/components/AppPieChart';
import CardReport from '@/components/CardReport';
import { DataTable } from '@/components/DataTable';
import { HeaderTitle } from '@/components/HeaderTitle';
import { MultiSelect } from '@/components/MultiSelect';
import StackCardMessage from '@/components/StackCardMessage';
import { Button } from '@/components/ui/button';
import type { ChartConfig } from '@/components/ui/chart';
import { Input } from '@/components/ui/input';
import { LeaveRequest, LEAVEREQUEST_LABELS } from '@/enums/leaveRequestEnum';
import type { EmployeeDto } from '@/models/dto/employeeDto';
import { Download, Loader, RotateCcwIcon, Search, UserPlus, Users, UserX } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { columns } from './columns';

const PayrollsPage = () => {
  //search
  const searchParams = useSearchParams();
  const [employees, setEmployees] = useState<EmployeeDto[]>([]);
  const [search, setSearch] = useState<string>(searchParams.get('search') || '');

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [departmentSelected, setDepartmentSelected] = useState<string[]>([]);

  const [typeWorkSelected, setTypeWorkSelected] = useState<string[]>([]);

  const router = useRouter();

  const [page, setPage] = useState<number>(searchParams.get('page') ? Number(searchParams.get('page')) : 1);
  const [total, setTotal] = useState<number>(0);
  const [limit, setLimit] = useState<number>(searchParams.get('limit') ? Number(searchParams.get('limit')) : 10);

  const [statusSelected, setStatusSelected] = useState<string[]>((searchParams.get('status') ?? '').split(',').filter(Boolean));

  const [stacked, setStacked] = useState<boolean>(false);

  const formatVND = (value: number) =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);

  useEffect(() => {
    updateSearchParams();
    fetchEmployees();
  }, [page, limit, search, departmentSelected, typeWorkSelected]);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await getEmployees(page, limit, { search, departments: departmentSelected, typeWorks: typeWorkSelected });
      setEmployees(res.employees);
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

  const updateSearchParams = () => {
    const params = new URLSearchParams();
    if (page) params.set('page', String(page));
    if (limit) params.set('limit', String(limit));
    if (search) params.set('search', String(search));
    if (departmentSelected) params.set('department', departmentSelected.join(','));
    if (typeWorkSelected) params.set('type', typeWorkSelected.join(','));

    router.push(`/dashboard/payrolls?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <HeaderTitle text="QUẢN LÝ BẢNG LƯƠNG" subText="Quản lý lương của nhân viên" />
      <StackCardMessage title="Vui lòng kiểm tra thống kê lại lương tháng vừa rồi trước khi thực hiện thao tác tạo lập bảng lương mới" />
      <div className="flex items-center gap-2 justify-end">
        <Button variant="secondary" onClick={() => {}}>
          <Download className="w-5 h-5 mr-2" />
          Xuất bản ghi
        </Button>
        <Button>Tạo bảng lương</Button>
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
            chartData={[
              { label: 'Thg 1', basicPayroll: 8_000_000, allowance: 2_000_000 },
              { label: 'Thg 2', basicPayroll: 8_200_000, allowance: 2_100_000 },
              { label: 'Thg 3', basicPayroll: 8_500_000, allowance: 2_200_000 },
              { label: 'Thg 4', basicPayroll: 8_500_000, allowance: 2_300_000 },
              { label: 'Thg 5', basicPayroll: 8_700_000, allowance: 2_400_000 },
              { label: 'Thg 6', basicPayroll: 8_900_000, allowance: 2_500_000 },
              { label: 'Thg 7', basicPayroll: 9_000_000, allowance: 2_600_000 },
              { label: 'Thg 8', basicPayroll: 9_200_000, allowance: 2_700_000 },
              { label: 'Thg 9', basicPayroll: 9_300_000, allowance: 2_800_000 },
              { label: 'Thg 10', basicPayroll: 9_500_000, allowance: 2_900_000 },
              { label: 'Thg 11', basicPayroll: 9_700_000, allowance: 3_000_000 },
              { label: 'Thg 12', basicPayroll: 10_000_000, allowance: 3_200_000 },
            ]}
            bars={[
              { key: 'basicPayroll', label: 'Lương cơ bản', color: 'var(--chart-3)' },
              { key: 'allowance', label: 'Phụ cấp', color: 'var(--chart-4)' },
            ]}
            chartConfig={
              {
                basicPayroll: {
                  label: 'Lương cơ bản',
                },
                allowance: {
                  label: 'Phụ cấp',
                },
              } satisfies ChartConfig
            }
            stacked={stacked}
            onchangeStacked={() => setStacked((prev) => !prev)}
          />
        </div>

        <div className="bg-primary-foreground p-4 rounded-lg">
          <AppPieChart />
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
            options={Object.entries(LeaveRequest).map(([__, value]) => ({
              label: LEAVEREQUEST_LABELS[value],
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
          <Button onClick={() => {}}>
            <RotateCcwIcon className="w-6 h-6" />
            Làm mới
          </Button>
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
      </div>
    </div>
  );
};

export default PayrollsPage;
