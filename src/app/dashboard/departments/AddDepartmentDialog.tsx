'use client';

import { createDepartment, updateDepartment } from '@/api/departments/department';
import { SubmitButton } from '@/components/SummitButton';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { DepartmentDto } from '@/models/dto/departmentDto';

import {
  createDepartmentSchema,
  updateDepartmentSchema,
  type CreateDepartmentFormData,
  type UpdateDepartmentFormData,
} from '@/models/schemas/createDepartmentSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogDescription } from '@radix-ui/react-dialog';
import { startTransition, useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface AddDepartmentDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  department?: DepartmentDto | null;
  reloadData: () => void;
}

export function AddDepartmentDialog({ open, setOpen, department, reloadData: loadData }: AddDepartmentDialogProps) {
  const isEdit = !!department;
  const formSchema = isEdit ? updateDepartmentSchema : createDepartmentSchema;
  type isEditFormData = CreateDepartmentFormData | UpdateDepartmentFormData;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateDepartmentFormData | UpdateDepartmentFormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (department) {
      reset({
        name: department.name,
        description: department.description,
      });
    } else {
      initialFormData();
    }
  }, [department]);

  const initialFormData = () => {
    reset({
      name: '',
      description: '',
    });
  };

  const [state, submitAction, isPending] = useActionState(async (prevState: any, formData: CreateDepartmentFormData) => {
    if (department) {
      const res = await updateDepartment(department.id as string, formData);
      if (res) {
        toast.success('Cập nhật phòng ban thành công');
        setOpen(false);
        initialFormData();
        loadData();
      }
    } else
      try {
        const res = await createDepartment(formData);
        if (res) {
          toast.success('Tạo phòng ban thành công');
          setOpen(false);
          initialFormData();
          loadData();
        }
      } catch (error: any) {
        toast.error('Tạo phòng ban thất bại', {
          description: error.message,
        });
      }
  }, undefined);

  const onSubmit = async (data: isEditFormData) => {
    startTransition(() => {
      submitAction(data);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md w-[500px] px-6 py-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <DialogHeader>
            <DialogTitle className="text-xl">{department ? 'Cập nhật phòng ban' : 'Tạo phòng ban'}</DialogTitle>
            <DialogDescription>
              {department ? 'Cập nhật thông tin phòng ban' : 'Điền thông tin phòng ban để tạo mới'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            <Label>Tên phòng ban</Label>
            <Input {...register('name')} placeholder="Nhập tên phòng ban" className="h-10" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label>Mô tả</Label>
            <Input {...register('description')} placeholder="Nhập mô tả" className="h-10" />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
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
            <SubmitButton text={department ? 'Cập nhật' : 'Tạo'} isPending={isPending} className={cn('w-auto')} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
