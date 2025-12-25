import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ATTENDANCE_COLOR, ATTENDANCE_LABELS, type AttendanceStatus } from '@/enums/attendanceEnum';
import { formatUTC } from '@/helpers/date.helper';
import type { AttendanceDto } from '@/models/dto/attendanceDto';
import { format } from 'date-fns';
import { Clock } from 'lucide-react';

interface Props {
  attendance: AttendanceDto;
}

const AttendanceCard = ({ attendance }: Props) => {
  return (
    <Card className="bg-muted/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Clock className="w-5 h-5" />
              {attendance.attendance.date ? format(new Date(attendance.attendance.date), 'dd-MM-yyyy') : '--'}
            </CardTitle>
            <span className="text-xs text-muted-foreground">
              {`${attendance.employee.lastname ?? ''} ${attendance.employee.firstname ?? ''}`.trim() || 'Đang cập nhật'}
              <span className="ml-1 mr-1">•</span>
              <span className="font-mono">{attendance.employee?.employeeCode}</span>
            </span>
          </div>

          <CardDescription>
            <div className={`${ATTENDANCE_COLOR[attendance.attendance.status as AttendanceStatus]}`}>
              {ATTENDANCE_LABELS[attendance.attendance.status as AttendanceStatus]}
            </div>
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex justify-between text-sm">
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Check-in</span>
            <span className="font-medium">
              {attendance.attendance.checkIn ? formatUTC(new Date(attendance.attendance.checkIn), 'hh:mm a') : '--'}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Check-out</span>
            <span className="font-medium">
              {attendance.attendance.checkOut ? formatUTC(new Date(attendance.attendance.checkOut), 'hh:mm a') : '--'}
            </span>
          </div>
        </div>

        {/* TỔNG GIỜ LÀM */}
        <div className="mt-3 flex justify-end text-sm">
          <span className="text-muted-foreground">
            Giờ làm:
            <span className="ml-1 font-semibold text-foreground">
              {attendance.attendance.workingHour !== undefined ? attendance.attendance.workingHour : '--/--'}
            </span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceCard;
