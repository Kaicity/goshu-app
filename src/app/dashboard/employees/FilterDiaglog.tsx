'use client';

import { getDepartments } from '@/api/departments/department';
import { SubmitButton } from '@/components/SummitButton';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { TypeWork, TYPEWORK_LABELS } from '@/enums/typeWorkEnum';
import { cn } from '@/lib/utils';
import { DepartmentDto } from '@/models/dto/departmentDto';
import { DialogDescription } from '@radix-ui/react-dialog';
import { PackageOpen, RotateCcwIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface FilterDepartmentProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onFilter: (filters: { departments: string[]; typeWorks: string[] }) => void;
  resetTrigger: boolean;
}

export function FilterDialog({ open, setOpen, onFilter, resetTrigger }: FilterDepartmentProps) {
  const searchParams = useSearchParams();
  const [departmentSelected, setDepartmentSelected] = useState<string[]>([]);
  const [typeWorkSelected, setTypeWorkSelected] = useState<string[]>((searchParams.get('type') ?? '').split(',').filter(Boolean));
  const [departments, setDepartments] = useState<DepartmentDto[]>([]);

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    // Khi resetTrigger thay đổi, clear checkbox
    setDepartmentSelected([]);
    setTypeWorkSelected([]);
  }, [resetTrigger]);

  const fetchDepartments = async () => {
    try {
      const res = await getDepartments(1, 100, { search: '' });
      setDepartments(res.departments);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const toggleDepartment = (id: string) => {
    setDepartmentSelected((prev) => (prev.includes(id) ? prev.filter((dep) => dep !== id) : [...prev, id]));
  };
  const toggleTypeWork = (id: TypeWork) => {
    setTypeWorkSelected((prev) => (prev.includes(id) ? prev.filter((dep) => dep !== id) : [...prev, id]));
  };

  const onSubmit = () => {
    const filterData = {
      departments: departmentSelected,
      typeWorks: typeWorkSelected,
    };
    console.log('f data', filterData);
    onFilter(filterData);
    setOpen(false);
  };
  const resetFilters = () => {
    setDepartmentSelected([]);
    setTypeWorkSelected([]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md w-[550px] px-6 py-8">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="text-xl">{'Sắp Xếp'}</DialogTitle>
            <DialogDescription>Lựa chọn sắp xếp theo</DialogDescription>
          </DialogHeader>

          <div className="flex w-full">
            <Button type="button" className="w-full" onClick={resetFilters}>
              <RotateCcwIcon className="w-6 h-6" />
              làm mới
            </Button>
          </div>
          {/* Deparment select */}
          <div className="flex flex-col gap-2">
            <Label>CHỌN PHÒNG BAN</Label>
            {departments.length == 0 ? (
              <div className="flex items-center justify-center min-h-20">
                <div className="flex flex-col gap-2 items-center text-muted-foreground">
                  <PackageOpen />
                  <span className="text-xs">Không có dữ liệu</span>
                </div>
              </div>
            ) : (
              <div className="max-h-64 overflow-y-auto pr-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {departments.map((dep) => (
                    <label key={dep.id} className="flex items-center gap-2 cursor-pointer text-sm">
                      <Checkbox
                        checked={departmentSelected.includes(dep.id!)}
                        onCheckedChange={() => toggleDepartment(dep.id!)}
                      />
                      <span>{dep.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            <Label>CHỌN NƠI LÀM VIỆC</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(TypeWork).map(([key, __]) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer text-sm">
                  <Checkbox
                    checked={typeWorkSelected.includes(key as TypeWork)}
                    onCheckedChange={() => toggleTypeWork(key as TypeWork)}
                  />
                  <span>{TYPEWORK_LABELS[key as TypeWork]}</span>
                </label>
              ))}
            </div>
          </div>

          <DialogFooter>
            <div className="flex justify-between w-full">
              <Button type="button" variant="outline" onClick={() => setOpen(false)} className="w-36">
                Đóng
              </Button>

              <SubmitButton text="Áp dụng" className="w-36" />
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
