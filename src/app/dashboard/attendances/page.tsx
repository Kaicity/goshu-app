'use client';

import { getAttendances } from '@/api/attendance/attendance';
import { DataTable } from '@/components/DataTable';
import { HeaderTitle } from '@/components/HeaderTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { AttendanceDto } from '@/models/dto/attendanceDto';
import { RotateCcwIcon, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { columns } from './columns';
import { useRouter, useSearchParams } from 'next/navigation';
import { DatePicker } from '@/components/date-picker';
import { format } from 'date-fns';
import { MultiSelect } from '@/components/MultiSelect';
import { ATTENDANCE_LABELS, AttendanceStatus } from '@/enums/attendanceEnum';

const AttendancesPage = () => {
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

  return (
    <>
      <HeaderTitle text="BẢNG NGÀY CÔNG" subText="Tất cả ngày công của nhân viên" />
      <div className="flex flex-wrap items-center gap-1 mb-6 mt-2">
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

        <Button variant="outline" onClick={resetFilters}>
          <RotateCcwIcon className="w-6 h-6" />
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={attendances}
        loading={loading}
        page={page}
        limit={limit}
        total={total}
        onPaginationChange={handlePaginationChange}
      />
    </>
  );
};

export default AttendancesPage;
