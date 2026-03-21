'use client';

import { getPayroll } from '@/api/payrolls/payroll';
import { HeaderTitle } from '@/components/HeaderTitle';
import InfoRow from '@/components/InfoUserRow';
import PayrollRow from '@/components/PayrollRow';
import { Card, CardContent } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { EMPLOYEE_STATUS_LABELS, type EmployeeStatus } from '@/enums/employeeEnum';
import { TYPEWORK_LABELS, type TypeWork } from '@/enums/typeWorkEnum';
import { PayrollDto } from '@/models/dto/payrollDto';
import { format } from 'date-fns';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const DetailPayrollPage = () => {
  const { userAccount } = useApp();

  const params = useParams();
  const [payrollDetail, setPayrollDetail] = useState<PayrollDto | null>(null);

  useEffect(() => {
    const fetchPayrollDetai = async () => {
      try {
        const res = await getPayroll(params?.id as string);
        setPayrollDetail(res);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchPayrollDetai();
  }, []);

  return (
    <>
      <HeaderTitle text="CHI TIẾT LƯƠNG" subText="Tất cả thông tin lương của nhân viên" />
      <Card>
        <CardContent>
          {/* Header Section */}
          <div className="flex items-center gap-4 mb-8">
            <Image
              src={(payrollDetail?.employee?.avatarUrl as string) ?? '/assets/default-avatar.png'}
              alt="Brooklyn Simmons"
              width={100}
              height={100}
              className="rounded-full object-cover w-14 h-14 border-2 border-white ring-1 ring-gray-100 shadow-sm"
            />
            <div>
              <h1 className="text-xl font-bold leading-tight">
                {`${payrollDetail?.employee.lastname || '-'} ${payrollDetail?.employee.firstname || '-'}`}
              </h1>
              <p className="text-sm text-muted-foreground font-medium">{payrollDetail?.employee.designation}</p>
            </div>
          </div>

          {/* Info Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-10">
            <div className="space-y-1">
              <InfoRow
                label="Trạng thái"
                value={EMPLOYEE_STATUS_LABELS[payrollDetail?.employee.status as EmployeeStatus] || '-'}
              />
              <InfoRow label="Hình thức làm việc" value={TYPEWORK_LABELS[payrollDetail?.employee.type as TypeWork] || '-'} />
              <InfoRow label="Dự án gần đây" value={'-'} />
            </div>
            <div className="space-y-1">
              <InfoRow label="Vị trí" value={payrollDetail?.employee.designation || '-'} />
              <InfoRow
                label="Ngày tham gia"
                value={payrollDetail?.employee.joinDate ? format(payrollDetail?.employee.joinDate, 'dd-MM-yyyy') : '-'}
              />
              <InfoRow label="Ngày làm việc cuối cùng" value={'-'} />
            </div>
          </div>

          {/* Total Compensation Section */}
          <div className="mb-6">
            <PayrollRow label="Total Compesation" amount={payrollDetail?.payroll.netSalary || 0} isTotal={true} />
          </div>

          {/* Line Items Section */}
          <div className="space-y-1">
            <PayrollRow label={'Lương cơ bản'} amount={payrollDetail?.payroll.basicSalary || 0} isExpandable={true} />
            <PayrollRow label={'Phụ cấp'} amount={payrollDetail?.payroll.allowance || 0} isExpandable={true} />
            <PayrollRow label={'Tăng ca'} amount={payrollDetail?.payroll.overtime || 0} isExpandable={true} />
            <PayrollRow label={'Khấu trừ'} amount={payrollDetail?.payroll.deductions || 0} isExpandable={true} />
          </div>

          {/* Subtle Footer Action */}
          <div className="mt-8 flex justify-end">
            <button className="text-sm text-cyan-500 font-semibold hover:underline transition-all">
              Xem tất cả lịch sử lương từ trước đến nay
            </button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default DetailPayrollPage;
