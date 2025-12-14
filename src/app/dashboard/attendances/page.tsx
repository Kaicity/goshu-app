'use client';

import { generateAttendanceForAllEmployees, getAttendances } from '@/api/attendance/attendance';
import AttendanceCard from '@/components/AttendanceCard';
import { DataTable } from '@/components/DataTable';
import { DatePicker } from '@/components/date-picker';
import { HeaderTitle } from '@/components/HeaderTitle';
import LoadingActionPage from '@/components/LoadingActionPage';
import { MultiSelect } from '@/components/MultiSelect';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { ATTENDANCE_LABELS, AttendanceStatus } from '@/enums/attendanceEnum';
import { useActionWithLoading } from '@/hooks/useExecute';
import type { AttendanceDto } from '@/models/dto/attendanceDto';
import { format } from 'date-fns';
import { CalendarClock, Clock, ClockArrowDown, ClockArrowUp, PackageOpen, RotateCcwIcon, Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { io, type Socket } from 'socket.io-client';
import { toast } from 'sonner';
import { columns } from './columns';

const SOCKET_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

const AttendancesPage = () => {
  const { isLoadingAction, execute } = useActionWithLoading();

  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState<string>(searchParams.get('search') || '');

  const [attendances, setAttendances] = useState<AttendanceDto[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState<number>(searchParams.get('page') ? Number(searchParams.get('page')) : 1);
  const [total, setTotal] = useState<number>(0);
  const [limit, setLimit] = useState<number>(searchParams.get('limit') ? Number(searchParams.get('limit')) : 10);

  const [dateSelected, setDateSelected] = useState<Date>(
    searchParams.get('date') ? new Date(searchParams.get('date') as string) : new Date(),
  );
  const [statusSelected, setStatusSelected] = useState<string[]>((searchParams.get('status') ?? '').split(',').filter(Boolean));

  useEffect(() => {
    updateSearchParams();
    fetchAttendances();
  }, [page, limit, search, statusSelected, dateSelected]);

  const fetchAttendances = async () => {
    setLoading(true);
    try {
      const res = await getAttendances(page, limit, { search, date: format(dateSelected, 'yyyy-MM-dd'), status: statusSelected });
      setAttendances(res.attendances);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const socket: Socket = io(SOCKET_URL);

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('attendance:update', (payload) => {
      console.log('Attendance updated:', payload);
      // Callback lại Api getall attendance
      fetchAttendances();
      toast.info(`Nhân viên: ${payload.employeeCode}-${payload.fullname}`, {
        description: `đã ${payload.type} lúc ${format(new Date(), 'hh:mm a')}`,
      });
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    return () => {
      socket.disconnect();
    };
  }, [page, limit, search, statusSelected, dateSelected]);

  const handlePaginationChange = (newPage: number, newLimit: number) => {
    setPage(newPage);
    setLimit(newLimit);
  };

  const resetFilters = () => {
    setSearch('');
    setPage(1);
    setLimit(10);
    setDateSelected(new Date());
    setStatusSelected([]);
  };

  const handleBirthdayChange = (date: Date | undefined) => {
    if (!date) return;
    setDateSelected(date);
  };

  const updateSearchParams = () => {
    const params = new URLSearchParams();
    if (page) params.set('page', String(page));
    if (limit) params.set('limit', String(limit));
    if (search) params.set('search', String(search));
    if (dateSelected) params.set('date', format(dateSelected, 'yyyy-MM-dd'));
    if (statusSelected) params.set('status', statusSelected.join(','));
    router.push(`/dashboard/attendances?${params.toString()}`);
  };

  const handleGenerateAttendance = async () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    execute(
      async () => {
        if (year && month) {
          await generateAttendanceForAllEmployees(year, month);
          fetchAttendances();
        }
      },
      {
        successMessage: 'Lịch chấm công đã tạo thành công',
      },
    );
  };

  return (
    <>
      {isLoadingAction && <LoadingActionPage />}

      <HeaderTitle text="BẢNG NGÀY CÔNG" subText="Tất cả ngày công của nhân viên" />

      {/* ATTENDANCE RULES */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
        <Card className="bg-muted/30 h-28 flex items-start justify-center">
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-orange-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex flex-col items-start text-sm gap-1">
                <h2 className="font-bold">28 Ngày</h2>
                <h5 className="font-medium">Tổng ngày chấm công</h5>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/30 h-28 flex items-start justify-center">
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-blue-500/10 flex items-center justify-center">
                <ClockArrowUp className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex flex-col items-start text-sm gap-1">
                <h2 className="font-bold">08:25 AM</h2>
                <h5 className="font-medium">Trung bình thời gian check-in</h5>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/30 h-28 flex items-start justify-center">
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-green-500/10 flex items-center justify-center">
                <ClockArrowDown className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex flex-col items-start text-sm gap-1">
                <h2 className="font-bold">17:35 PM</h2>
                <h5 className="font-medium">Trung bình thời gian check-out</h5>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lịch sử chấm công</CardTitle>
          <CardDescription>Lịch sử chấm công trong tháng</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap items-center gap-2 mb-6 mt-2 w-full">
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
              options={Object.entries(AttendanceStatus).map(([__, value]) => ({
                label: ATTENDANCE_LABELS[value],
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

            <DatePicker onDateChange={handleBirthdayChange} dateValue={dateSelected} className="h-9 w-full md:w-max" />

            <Button onClick={resetFilters}>
              <RotateCcwIcon className="w-6 h-6" />
              Làm mới
            </Button>

            <Button className="w-full md:w-max ml-auto" onClick={handleGenerateAttendance}>
              <CalendarClock className="w-4 h-4 mr-2" />
              Tạo lịch chấm công
            </Button>
          </div>

          {/* ATTENDANCE DATA */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-4">
            {loading ? (
              <div className="col-span-4">
                <Spinner />
              </div>
            ) : attendances.length ? (
              attendances.map((item) => <AttendanceCard key={item.attendance.id} attendance={item} />)
            ) : (
              <div className="flex flex-col gap-2 items-center text-muted-foreground col-span-4 py-2">
                <PackageOpen />
                <span className="text-xs">Không có dữ liệu</span>
              </div>
            )}
          </div>

          {/* ONLY USE PAGINATION */}
          <DataTable
            columns={columns}
            data={attendances}
            loading={loading}
            page={page}
            limit={limit}
            total={total}
            showTable={false}
            onPaginationChange={handlePaginationChange}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default AttendancesPage;
