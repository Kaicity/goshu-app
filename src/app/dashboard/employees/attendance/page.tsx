'use client';

import { checkIn, checkOut, getAttendances } from '@/api/attendance/attendance';
import { getEmployee } from '@/api/employee/employee';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { ATTENDANCE_COLOR, ATTENDANCE_LABELS, AttendanceStatus } from '@/enums/attendanceEnum';
import { formatUTC } from '@/helpers/date.helper';
import type { AttendanceDto } from '@/models/dto/attendanceDto';
import { EmployeeDto } from '@/models/dto/employeeDto';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { CheckCheck, Clock, LogIn, LogOut, PackageOpen, User } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const AttendancePage = () => {
  const { userAccount } = useApp();

  type AttendanceActionsStatus = 'NONE' | 'CHECKED_IN' | 'CHECKED_OUT';
  const [status, setStatus] = useState<AttendanceActionsStatus>('NONE');
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
  const [attendanceHistories, setAttendanceHistories] = useState<AttendanceDto[]>([]);
  const [employee, setEmployee] = useState<EmployeeDto | null>(null);
  const [employeeId, setEmployeeId] = useState<string>(userAccount?.employeeId as string);

  if (!employeeId) redirect('/dashboard'); // Tránh refesh page khi component render không kịp :)))

  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('vi-VN', { hour12: false }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getEmployeeDetail();
    fetchAttendanceHistory();
  }, []);

  const fetchAttendanceHistory = async () => {
    try {
      const res = await getAttendances(1, 31, { employeeId });
      setAttendanceHistories(
        res.attendances.sort((a, b) => {
          const dateA = a.attendance.date ? new Date(a.attendance.date).getTime() : 0;
          const dateB = b.attendance.date ? new Date(b.attendance.date).getTime() : 0;
          return dateA - dateB;
        }),
      );

      // lấy record hôm nay
      const today = format(new Date(), 'yyyy-MM-dd');

      const todayRecord = res.attendances.find((item) => {
        const recordDate = item.attendance.date ? format(new Date(item.attendance.date), 'yyyy-MM-dd') : '';
        return recordDate === today;
      });

      if (todayRecord) {
        if (todayRecord.attendance.checkIn && !todayRecord.attendance.checkOut) {
          setStatus('CHECKED_IN');
          setCheckInTime(formatUTC(new Date(todayRecord.attendance.checkIn)));
        } else if (todayRecord.attendance.checkIn && todayRecord.attendance.checkOut) {
          setStatus('CHECKED_OUT');
          setCheckInTime(formatUTC(new Date(todayRecord.attendance.checkIn)));
          setCheckOutTime(formatUTC(new Date(todayRecord.attendance.checkOut)));
        } else {
          setStatus('NONE');
        }
      } else {
        setStatus('NONE');
      }
    } catch (error: any) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const getEmployeeDetail = async () => {
    try {
      const res = await getEmployee(employeeId);
      setEmployee(res);
    } catch (error: any) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const handleCheckIn = async () => {
    setCheckInTime(format(new Date(), 'HH:mm'));
    setStatus('CHECKED_IN');

    try {
      await checkIn(employeeId);
      toast.success('Check-In hôm nay', { description: 'Bạn đã Check-In thành công' });
      fetchAttendanceHistory();
    } catch (error: any) {
      setStatus('NONE');
      toast.error(error.message);
    }
  };

  const handleCheckOut = async () => {
    setCheckOutTime(format(new Date(), 'HH:mm'));
    setStatus('CHECKED_OUT');
    try {
      await checkOut(employeeId);
      toast.success('Check-Out hôm nay', { description: 'Bạn đã Check-Out thành công' });
      fetchAttendanceHistory();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-max flex flex-col items-center justify-start bg-background p-6">
      {/* Card chính */}
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2">
            <User className="w-8 h-8 text-primary" />
            <CardTitle className="text-xl font-semibold">Goshu chấm công</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Xin chào, {`${employee?.lastname} ${employee?.firstname}`} (Mã NV: {employee?.employeeCode})
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
            <div className="flex flex-col gap-2 items-center mb-3">
              <Clock className="w-10 h-10 text-primary" />
              <p className="text-lg">{currentTime}</p>
            </div>
            {status === 'NONE' && <p className="text-muted-foreground">Bạn chưa check in hôm nay</p>}
            {status === 'CHECKED_IN' && <p className="text-primary font-medium">Đã check in lúc {checkInTime}</p>}
            {status === 'CHECKED_OUT' && <p className="text-primary font-medium">Đã check out lúc {checkOutTime}</p>}
          </motion.div>

          <div className="flex justify-center gap-4">
            <Button onClick={handleCheckIn} disabled={status !== 'NONE'} className="flex items-center gap-2">
              <LogIn className="w-4 h-4" /> Check In
            </Button>
            <Button
              onClick={handleCheckOut}
              disabled={status !== 'CHECKED_IN'}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Check Out
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="w-full max-w-md mt-8">
        <h2 className="text-lg font-semibold mb-3">Lịch sử chấm công</h2>
        <div className="border rounded-lg divide-y text-sm overflow-y-auto max-h-72">
          {attendanceHistories.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center p-2 text-foreground">
              <div className="flex items-center">
                <span>{item.attendance.date ? formatUTC(new Date(item.attendance.date), 'dd/MM/yyyy') : '--'}</span>
                {formatUTC(new Date(item.attendance.date as string), 'dd/MM/yyyy') === format(new Date(), 'dd/MM/yyyy') ? (
                  <CheckCheck size={20} className="ml-2" />
                ) : (
                  <></>
                )}
              </div>
              {item.attendance.status === AttendanceStatus.ABSENT ? (
                <span className={`${ATTENDANCE_COLOR[item.attendance.status as AttendanceStatus]} font-medium`}>
                  {ATTENDANCE_LABELS[item.attendance.status as AttendanceStatus]}
                </span>
              ) : (
                <div className="flex gap-4">
                  <span className="text-primary">
                    In: {item.attendance.checkIn ? formatUTC(new Date(item.attendance.checkIn)) : '--'}
                  </span>
                  <span className="text-foreground">
                    Out: {item.attendance.checkOut ? formatUTC(new Date(item.attendance.checkOut)) : '--'}
                  </span>
                  <span className={`${ATTENDANCE_COLOR[item.attendance.status as AttendanceStatus]} font-medium`}>
                    {ATTENDANCE_LABELS[item.attendance.status as AttendanceStatus]}
                  </span>
                </div>
              )}
            </div>
          ))}

          {attendanceHistories.length === 0 && (
            <div className="flex items-center justify-center min-h-20">
              <div className="flex flex-col gap-2 items-center text-muted-foreground">
                <PackageOpen />
                <span className="text-xs">Không có dữ liệu</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
