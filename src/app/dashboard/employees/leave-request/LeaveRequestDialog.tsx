'use client';
import { createLeaveRequest } from '@/api/leaverequest/leaverequest';
import { DatePicker } from '@/components/date-picker';
import { SubmitButton } from '@/components/SummitButton';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApp } from '@/contexts/AppContext';
import { LeaveRequest } from '@/enums/leaveRequestEnum';
import { cn } from '@/lib/utils';
import { LeaveRequestDto } from '@/models/dto/leaverequestDto';
import { createLeaveRequestFormData, createLeaveRequestSchema } from '@/models/schemas/createLeaveRequestSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogDescription } from '@radix-ui/react-dialog';
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

  useEffect(() => {
    if (leaveRequest) {
      reset({
        startDate: new Date(startDateSelected),
        endDate: new Date(endDateSelected),
        reason: leaveRequest.leaveRequest.reason,
        note: leaveRequest.leaveRequest.note,
        status: leaveRequest.leaveRequest.status,
      });
    } else {
      initialFormData();
    }
  }, [leaveRequest]);

  const initialFormData = () => {
    reset({
      employeeId: employeeId,
      startDate: startDateSelected,
      endDate: endDateSelected,
      reason: '',
      note: '',
      status: LeaveRequest.PENDING,
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
    setValue('startDate', date);
  };
  const handleEndDateChange = (date: Date | undefined) => {
    if (!date) return;
    setEndDateSelected(date);
    setValue('endDate', date);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Đơn xin nghỉ phép</DialogTitle>
            <DialogDescription>Điền thông tin nghỉ phép</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Ngày bắt đầu</Label>
              <DatePicker onDateChange={handleStartDateChange} dateValue={startDateSelected} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Ngày kết thúc</Label>
              <DatePicker onDateChange={handleEndDateChange} dateValue={endDateSelected} />
            </div>

            <div className="flex flex-col gap-2 col-span-2">
              <Label>Lí do</Label>
              <Input {...register('reason')} placeholder="Lí do " className="h-12" />
            </div>
            <div className="flex flex-col gap-2 col-span-2">
              <Label>Ghi chú</Label>
              <Input {...register('note')} placeholder="Ghi chú" className="h-12" />
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
