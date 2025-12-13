import { Card, CardHeader, CardTitle, CardContent, CardAction } from '@/components/ui/card';
import { LEAVEREQUEST_LABELS, LEAVEREQUEST_STYLES } from '@/enums/leaveRequestEnum';
import { LeaveRequestDto } from '@/models/dto/leaverequestDto';
import { format } from 'date-fns';
import { PackageOpen } from 'lucide-react';

interface LeaveCardProps {
  data: LeaveRequestDto[];
}

type LeaveRequestStatus = keyof typeof LEAVEREQUEST_STYLES;
export function LeaveCard({ data }: LeaveCardProps) {
  // Tính số ngày chênh lệch

  return (
    <div className="space-y-4">
      {data.length > 0 ? (
        <>
          {data.map((item) => {
            console.log('Item in LeaveCard:', item.createdAt);

            const startDateObj = item.leaveRequest.startDate ? new Date(item.leaveRequest.startDate) : null;
            const endDateObj = item.leaveRequest.endDate ? new Date(item.leaveRequest.endDate) : null;

            const durationDays =
              startDateObj && endDateObj
                ? Math.round((endDateObj.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24)) + 1
                : 0;

            // Khi hiển thị:
            const startDate = startDateObj ? format(startDateObj, 'dd/MM/yyyy') : 'N/A';
            const endDate = endDateObj ? format(endDateObj, 'dd/MM/yyyy') : 'N/A';

            const createdAt = item.createdAt ? format(new Date(item.createdAt), 'dd/MM/yyyy') : 'N/A';
            return (
              <Card key={item.leaveRequest.id} className="flex justify-between items-start shadow-md rounded-lg p-4">
                {/* Left side */}
                <div className="flex flex-col gap-2 w-full ">
                  <div className=" flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold">{item.leaveRequest.reason || 'Không có lý do'}</CardTitle>
                    <p className="text-right text-sm text-gray-500">Ngày tạo đơn: {createdAt}</p>
                  </div>

                  <CardContent className="px-0 py-0">
                    {item.leaveRequest.note && <p className="text-md">{item.leaveRequest.note}</p>}
                    <p className="text-sm text-gray-500 mt-1">
                      Thời gian nghỉ phép:{' '}
                      <span className="font-medium">
                        {startDate} - {endDate} ({durationDays} ngày)
                      </span>
                    </p>
                  </CardContent>
                </div>

                {/* Right side */}
                <CardAction>
                  <div className={`${LEAVEREQUEST_STYLES[item.leaveRequest.status as LeaveRequestStatus]} px-4 py-1`}>
                    {LEAVEREQUEST_LABELS[item.leaveRequest.status as LeaveRequestStatus]}
                  </div>
                </CardAction>
              </Card>
            );
          })}
        </>
      ) : (
        <div className="flex items-center justify-center min-h-20">
          <div className="flex flex-col gap-2 items-center text-muted-foreground">
            <PackageOpen size={30} />
            <span className="text-xs">Không có dữ liệu</span>
          </div>
        </div>
      )}
    </div>
  );
}
