'use client';

import { updatePayroll } from '@/api/payrolls/payroll';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { PayrollDto } from '@/models/dto/payrollDto';
import { updatePayrollSchema, type UpdatePayrollFormData } from '@/models/schemas/updatePayrollSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface EditPayrollSheetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  payrollData?: PayrollDto | null;
  reloadData: () => void;
}

const EditPayrollSheet = ({ open, setOpen, payrollData, reloadData: loadData }: EditPayrollSheetProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<UpdatePayrollFormData>({
    resolver: zodResolver(updatePayrollSchema),
  });

  const basicSalary = watch('basicSalary') || 0;
  const allowance = watch('allowance') || 0;
  const overtime = watch('overtime') || 0;
  const extraDeductions = watch('deductions') || 0;

  const currentDeductions = payrollData?.payroll.deductions || 0;

  const totalIncome = basicSalary + allowance + overtime;
  const totalDeductions = currentDeductions + extraDeductions;
  const netSalary = totalIncome - totalDeductions;

  useEffect(() => {
    initialFormData();
  }, [payrollData]);

  const initialFormData = () => {
    reset({
      allowance: payrollData?.payroll?.allowance,
      basicSalary: payrollData?.payroll.basicSalary,
      deductions: 0,
      overtime: payrollData?.payroll?.overtime,
    });
  };

  const [state, submitAction, isPending] = useActionState(async (prevState: any, formData: UpdatePayrollFormData) => {
    if (payrollData) {
      try {
        //cập nhật thông tin mà không change password
        const res = await updatePayroll(payrollData.payroll.id as string, formData);
        if (res) {
          toast.success('Cập nhật lương nhân viên thành công');
          setOpen(false);
          initialFormData();
          loadData();
        }
      } catch (error: any) {
        toast.error('Cập nhật lương thất bại', {
          description: error.message,
        });
      }
    }
  }, undefined);

  const onSubmit = async (data: UpdatePayrollFormData) => {
    console.log(data);

    startTransition(() => {
      submitAction(data);
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
          <SheetHeader>
            <SheetTitle>Cập nhật bảng lương</SheetTitle>
            <SheetDescription>
              Chỉnh sửa thông tin lương nhân viên. Mọi thay đổi sẽ được ghi nhận để phục vụ kiểm toán.
            </SheetDescription>
          </SheetHeader>

          <div className="grid gap-6 py-6 auto-rows-min px-4">
            <div className="grid gap-2">
              <Label>Lương cơ bản</Label>
              <Input
                {...register('basicSalary', {
                  setValueAs: (value) => Number(value),
                })}
                type="number"
                placeholder="0"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Phụ cấp</Label>
                <Input
                  {...register('allowance', {
                    setValueAs: (value) => Number(value),
                  })}
                  type="number"
                />
              </div>

              <div className="grid gap-2">
                <Label>Tiền tăng ca</Label>
                <Input
                  {...register('overtime', {
                    setValueAs: (value) => Number(value),
                  })}
                  type="number"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label className="text-destructive">* Khấu trừ hiện tại</Label>
              <Input defaultValue={payrollData?.payroll.deductions} readOnly type="number" className="border-destructive/50" />
            </div>

            <div className="grid gap-2">
              <Label className="text-destructive">* Khấu trừ bổ sung</Label>
              <Input
                {...register('deductions', {
                  setValueAs: (value) => Number(value),
                })}
                type="number"
                className="border-destructive/50"
              />
            </div>
          </div>

          <div className="mx-4 mb-4 rounded-xl border bg-muted/40 p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span>Tổng thu nhập</span>
              <span className="font-medium">{totalIncome.toLocaleString()} ₫</span>
            </div>

            <div className="flex justify-between text-sm text-destructive">
              <span>Tổng khấu trừ</span>
              <span className="font-medium">- {totalDeductions.toLocaleString()} ₫</span>
            </div>

            <div className="border-t pt-3 flex justify-between">
              <span className="font-semibold">Thực lãnh</span>
              <span className="font-bold text-lg text-primary">{netSalary.toLocaleString()} ₫</span>
            </div>
          </div>

          <SheetFooter>
            <Button type="submit">Lưu thay đổi</Button>

            <SheetClose asChild>
              <Button type="button" variant="outline">
                Đóng
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default EditPayrollSheet;
