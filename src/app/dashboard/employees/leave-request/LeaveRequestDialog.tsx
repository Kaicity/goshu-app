'use client';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DialogDescription } from '@radix-ui/react-dialog';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/date-picker';
import { Input } from '@/components/ui/input';

interface LeaveRequestDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function LeaveRequestDialog({ open, setOpen }: LeaveRequestDialogProps) {
  const [startDateSelected, setStartDateSelected] = useState<Date>(new Date());
  const [endDateSelected, setEndDateSelected] = useState<Date>(new Date());
  const handleStartDateChange = (date: Date | undefined) => {
    if (!date) return;
    setStartDateSelected(date);
  };
  const handleEndDateChange = (date: Date | undefined) => {
    if (!date) return;
    setEndDateSelected(date);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
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
            <Input placeholder="Lí do " className="h-12" />
          </div>
          <div className="flex flex-col gap-2 col-span-2">
            <Label>Ghi chú</Label>
            <Input placeholder="Ghi chú" className="h-12" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
