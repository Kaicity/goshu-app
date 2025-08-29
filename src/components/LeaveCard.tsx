import { Card, CardHeader, CardTitle, CardContent, CardAction } from '@/components/ui/card';
import { LEAVEREQUEST_LABELS, LEAVEREQUEST_STYLES } from '@/enums/leaveRequestEnum';
import { LeaveRequestDto } from '@/models/dto/leaverequestDto';
import { format } from 'date-fns';

interface LeaveCardProps {
  data: LeaveRequestDto[];
}

type LeaveRequestStatus = keyof typeof LEAVEREQUEST_STYLES;

export function LeaveCard({ data }: LeaveCardProps) {
  return (
    <div className="space-y-4">
      {data.map((item) => {
        console.log('Item in LeaveCard:', item.createdAt);

        const startDate = item.leaveRequest.startDate ? format(new Date(item.leaveRequest.startDate), 'dd/MM/yyyy') : 'N/A';

        const endDate = item.leaveRequest.endDate ? format(new Date(item.leaveRequest.endDate), 'dd/MM/yyyy') : 'N/A';

        const createdAt = item.createdAt ? format(new Date(item.createdAt), 'dd/MM/yyyy') : 'N/A';
        return (
          <Card key={item.leaveRequest.id} className="flex justify-between items-start shadow-md rounded-lg p-4">
            {/* Left side */}
            <div className="flex flex-col gap-2 w-full ">
              <div className=" flex justify-between items-start">
                <div className='flex flex-row gap-3 items-center'>
                  <CardTitle className="text-lg font-semibold">{item.leaveRequest.reason || 'No Reason Provided'}</CardTitle>
                  <div className={`${LEAVEREQUEST_STYLES[item.leaveRequest.status as LeaveRequestStatus]}`}>
                    {LEAVEREQUEST_LABELS[item.leaveRequest.status as LeaveRequestStatus]}
                  </div>
                </div>

                <p className="text-right text-sm text-gray-500">Submitted: {createdAt}</p>
              </div>

              <CardContent className="px-0 py-0">
                {item.leaveRequest.note && <p className="text-gray-700">{item.leaveRequest.note}</p>}
                <p className="text-sm text-gray-500 mt-1">
                  Duration:{' '}
                  <span className="font-medium">
                    {startDate} - {endDate}
                  </span>
                </p>
              </CardContent>
            </div>

            {/* Right side */}
            <CardAction className="px-0 text-right">
              <p className="text-sm text-gray-500">
                {item.employee.firstname} {item.employee.lastname}
              </p>
            </CardAction>
          </Card>
        );
      })}
    </div>
  );
}
