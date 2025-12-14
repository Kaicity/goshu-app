import { Card, CardHeader, CardTitle, CardContent, CardAction } from '@/components/ui/card';
import { LEAVEREQUEST_LABELS, LEAVEREQUEST_STYLES } from '@/enums/leaveRequestEnum';
import { LeaveRequestDto } from '@/models/dto/leaverequestDto';
import { format } from 'date-fns';
import { PackageOpen, Pin } from 'lucide-react';

interface LeaveCardProps {
  data: LeaveRequestDto[];
}

type LeaveRequestStatus = keyof typeof LEAVEREQUEST_STYLES;
export function LeaveCard({ data }: LeaveCardProps) {
  // Tính số ngày chênh lệch

  return (
    <div className="space-y-3">
      {data.length > 0 ? (
        data.map((item) => {
          const startDateObj = item.leaveRequest.startDate ? new Date(item.leaveRequest.startDate) : null;
          const endDateObj = item.leaveRequest.endDate ? new Date(item.leaveRequest.endDate) : null;

          const durationDays =
            startDateObj && endDateObj
              ? Math.round((endDateObj.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24)) + 1
              : 0;

          const startDate = startDateObj ? format(startDateObj, 'dd/MM/yyyy') : 'N/A';
          const endDate = endDateObj ? format(endDateObj, 'dd/MM/yyyy') : 'N/A';
          const createdAt = item.createdAt ? format(new Date(item.createdAt), 'dd/MM/yyyy') : 'N/A';

          return (
            <Card key={item.leaveRequest.id} className="relative hover:shadow-lg transition-shadow">
              <Pin className="absolute -top-2 -left-1 w-5 h-5 text-red-400 -rotate-12" />

              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-base font-semibold">{item.leaveRequest.reason || 'Không có lý do'}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">Ngày tạo đơn: {createdAt}</p>
                  </div>

                  {/* Status */}
                  <div
                    className={`
                  px-3 py-1 rounded-full text-xs font-medium
                  ${LEAVEREQUEST_STYLES[item.leaveRequest.status as LeaveRequestStatus]}
                `}
                  >
                    {LEAVEREQUEST_LABELS[item.leaveRequest.status as LeaveRequestStatus]}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-2 space-y-2">
                {item.leaveRequest.note && <p className="text-sm text-foreground">{item.leaveRequest.note}</p>}

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium text-foreground">{startDate}</span> →{' '}
                    <span className="font-medium text-foreground">{endDate}</span>
                  </div>
                  <div>({durationDays} ngày)</div>
                </div>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <div className="flex items-center justify-center min-h-[120px]">
          <div className="flex flex-col gap-2 items-center text-muted-foreground">
            <PackageOpen size={28} />
            <span className="text-sm">Không có đơn xin nghỉ</span>
          </div>
        </div>
      )}
    </div>
  );
}
