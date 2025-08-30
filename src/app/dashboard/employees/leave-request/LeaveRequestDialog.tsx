'use client';
import React from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DialogDescription } from '@radix-ui/react-dialog';

interface LeaveRequestDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export function LeaveRequestDialog({ open, setOpen }: LeaveRequestDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
            <DialogTitle>Đơn xin nghỉ phép</DialogTitle>
            <DialogDescription>Điền thông tin nghỉ phép</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
