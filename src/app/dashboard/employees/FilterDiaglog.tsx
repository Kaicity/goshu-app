'use client';

import { getDepartments } from '@/api/departments/department';
import { createAccountUser, updateAccountUser } from '@/api/users/user';
import { MultiSelect } from '@/components/MultiSelect';
import { SubmitButton } from '@/components/SummitButton';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Status, STATUS_LABELS } from '@/enums/statusEnum';
import { ROLE_ICONS, ROLE_LABELS, UserRole } from '@/enums/userRolesEnum';
import { cn } from '@/lib/utils';
import { DepartmentDto } from '@/models/dto/departmentDto';
import type { UserAccountDto } from '@/models/dto/userAccountDto';
import {
  createAccountSchema,
  updateAccountSchema,
  type createAccountFormData,
  type updateAccountFormData,
} from '@/models/schemas/createAccountSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogDescription } from '@radix-ui/react-dialog';
import { startTransition, use, useActionState, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface FilterDepartmentProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  // Phòng ban
  departments: DepartmentDto[];
  departmentSelected: string[];
  onDepartmentChange: (ids: string[]) => void;
}

export function FilterDialog({ open, setOpen }: FilterDepartmentProps) {
  const [departmentSelected, setDepartmentSelected] = useState<string[]>([]);
  const [departments, setDepartments] = useState<DepartmentDto[]>([]);

  useEffect(() => {
    fetchDepartments();
  }, []);
  const fetchDepartments = async () => {
    try {
      const res = await getDepartments(1, 100, { search: '' });
      setDepartments(res.departments);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md w-[500px] px-6 py-8">
        <form className="space-y-6">
          <DialogHeader>
            <DialogTitle className="text-xl">{'Sắp Xếp'}</DialogTitle>
            <DialogDescription>Lựa chọn sắp xếp theo</DialogDescription>
          </DialogHeader>

          {/* Deparment select */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 w-full ">
              <Label>Phòng Ban</Label>

              <MultiSelect
                options={departments.map((department) => ({
                  label: department.name,
                  value: department.id!,
                }))}
                value={departmentSelected}
                onValueChange={(values) => setDepartmentSelected(values)}
                placeholder="Chọn phòng ban"
                className="relative sm:w-[200px] w-full justify-start"
              />
            </div>

            {/* Status select */}
            <div className="flex flex-col gap-2 w-full ">
              <Label className="text-right pr-12">Trạng Thái</Label>
            </div>
            {/* {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>} */}
          </div>
          <DialogFooter className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setOpen(false);
              }}
            >
              Đóng
            </Button>
            <SubmitButton text={'Tạo'} className={cn('w-auto')} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
