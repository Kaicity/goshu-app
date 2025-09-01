'use client';
import { startTransition, useActionState, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DialogDescription } from '@radix-ui/react-dialog';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/date-picker';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SubmitButton } from '@/components/SummitButton';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { createLeaveRequestFormData, createLeaveRequestSchema } from '@/models/schemas/createLeaveRequestSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { LeaveRequest } from '@/enums/leaveRequestEnum';
import { createLeaveRequest } from '@/api/leaverequest/leaverequest';
import { set } from 'nprogress';
import { LeaveRequestDto } from '@/models/dto/leaverequestDto';
import { useApp } from '@/contexts/AppContext';

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
  const [employeeId, setEmployeeId] = useState<string>(userAccount?.employeeId as string);
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
  // const [state, submitAction, isPending] = useActionState(async (prevState: any, formData: createLeaveRequestFormData) => {
  //   console.log('Dữ liệu gửi đi từ submitAction:', formData);
  //   try {
  //     const res = await createLeaveRequest(formData);

  //     console.log('Dữ liệu trả về từ API:', res);
  //     if (res) {
  //       toast.success('Tạo đơn xin nghỉ phép thành công');
  //       setOpen(false);
  //       initialFormData();
  //       loadData();
  //     }
  //   } catch (error: any) {
  //     toast.error('Tạo phòng ban thất bại', {
  //       description: error.message,
  //     });
  //   }
  // }, undefined);

  const [isPending, setIsPending] = useState(false);

  const onSubmit = async (data: createLeaveRequestFormData) => {
    console.log('Submit dữ liệu:', data);
    setIsPending(true);
    try {
      const res = await createLeaveRequest(data);
      if (res) {
        toast.success('Tạo đơn xin nghỉ phép thành công');
        setOpen(false);
        initialFormData();
        loadData();
      }
    } catch (error: any) {
      toast.error('Tạo đơn thất bại', { description: error.message });
    } finally {
      setIsPending(false);
    }
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
