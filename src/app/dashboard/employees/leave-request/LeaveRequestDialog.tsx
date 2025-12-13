'use client';
import { createLeaveRequest } from '@/api/leaverequest/leaverequest';
import { DatePicker } from '@/components/date-picker';
import { SubmitButton } from '@/components/SummitButton';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useApp } from '@/contexts/AppContext';
import { LeaveRequest } from '@/enums/leaveRequestEnum';
import { cn } from '@/lib/utils';
import { LeaveRequestDto } from '@/models/dto/leaverequestDto';
import { createLeaveRequestFormData, createLeaveRequestSchema } from '@/models/schemas/createLeaveRequestSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogDescription } from '@radix-ui/react-dialog';
import { format } from 'date-fns';
import { startTransition, useActionState, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface LeaveRequestDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  reloadData: () => void;
  leaveRequest: LeaveRequestDto | null;
}

export function LeaveRequestDialog({ open, setOpen, leaveRequest, reloadData: loadData }: LeaveRequestDialogProps) {
  const [startDateSelected, setStartDateSelected] = useState<Date>(new Date());
  const [endDateSelected, setEndDateSelected] = useState<Date>(new Date());
  const { userAccount } = useApp();

  const [employeeId] = useState<string>(userAccount?.employeeId as string);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<createLeaveRequestFormData>({ resolver: zodResolver(createLeaveRequestSchema) });
  useEffect(() => {
    console.log('Form errors:', errors);
  }, [errors]);

  useEffect(() => {
    if (userAccount?.employeeId) {
      setValue('employeeId', userAccount.employeeId);
    }
  }, [userAccount, setValue]);

  const initialFormData = () => {
    reset({
      employeeId: employeeId,
      startDate: '',
      endDate: '',
      reason: '',
      note: '',
    });
  };

  const [state, submitAction, isPending] = useActionState(async (prevState: any, formData: createLeaveRequestFormData) => {
    try {
      const res = await createLeaveRequest(formData);
      if (res) {
        toast.success('Tạo đơn xin nghỉ phép thành công');
        setOpen(false);
        initialFormData();
        loadData();
      }
    } catch (error: any) {
      toast.error('Tạo đơn nghỉ phép thất bại', {
        description: error.message,
      });
    }
  }, undefined);

  const onSubmit = async (data: createLeaveRequestFormData) => {
    startTransition(() => {
      submitAction(data);
    });
  };

  const handleStartDateChange = (date: Date | undefined) => {
    if (!date) return;
    setStartDateSelected(date);
    const startDateStr = format(date, 'yyyy-MM-dd');
    setValue('startDate', startDateStr);
  };
  const handleEndDateChange = (date: Date | undefined) => {
    if (!date) return;
    setEndDateSelected(date);
    const endDateStr = format(date, 'yyyy-MM-dd');
    setValue('endDate', endDateStr);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Đơn xin nghỉ phép</DialogTitle>
            <DialogDescription>Điền thông tin nghỉ phép</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 my-5">
            <div className="flex flex-col gap-2">
              <Label>Ngày bắt đầu</Label>
              <DatePicker
                onDateChange={handleStartDateChange}
                dateValue={startDateSelected}
                className={cn(errors.startDate && 'border border-red-500 rounded-md')}
              />
              {errors.startDate && <p className="text-sm text-red-500">{errors.startDate.message}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Ngày kết thúc</Label>
              <DatePicker
                onDateChange={handleEndDateChange}
                dateValue={endDateSelected}
                className={cn(errors.endDate && 'border border-red-500 rounded-md')}
              />
              {errors.startDate && <p className="text-sm text-red-500">{errors.startDate.message}</p>}
            </div>

            <div className="flex flex-col gap-2 col-span-2">
              <Label className={cn(errors.reason && 'text-red-500')}>Lí do</Label>
              <Textarea
                {...register('reason')}
                placeholder="Lí do "
                className={cn('max-h-[150px] h-28', errors.reason && 'border-red-500 focus-visible:ring-red-500')}
              />
              {errors.reason && <p className="text-sm text-red-500">{errors.reason.message}</p>}
            </div>
            <div className="flex flex-col gap-2 col-span-2">
              <Label className={cn(errors.note && 'text-red-500')}>Ghi chú</Label>
              <Textarea
                {...register('note')}
                placeholder="Ghi chú"
                className={cn('max-h-[150px] h-28', errors.note && 'border-red-500 focus-visible:ring-red-500')}
              />
              {errors.note && <p className="text-sm text-red-500">{errors.note.message}</p>}
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setOpen(false);
                initialFormData();
              }}
            >
              Đóng
            </Button>
            <SubmitButton text={'Tạo'} isPending={isPending} className={cn('w-auto')} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
