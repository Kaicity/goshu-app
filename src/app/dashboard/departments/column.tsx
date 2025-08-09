'use client';
import { ColumnDef } from '@tanstack/react-table';
import { DepartmentDto } from '@/models/dto/departmentDto';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
export const columns: ColumnDef<DepartmentDto>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className="flex justify-center">
        <Checkbox
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Checkbox onCheckedChange={(value) => row.toggleSelected(!!value)} checked={row.getIsSelected()} />
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Tên phòng ban',
  },
  {
    accessorKey: 'description',
    header: 'Mô tả',
  },
  {
    accessorKey: 'updatedAt',
    header: () => <div className="text-center">CẬP NHẬT LÚC</div>,
    cell: ({ row }) => {
      const updatedAt = row.original.updatedAt;
      return <div className="text-center">{updatedAt ? format(new Date(updatedAt), 'dd/MM/yyyy HH:mm:ss') : ''}</div>;
    },
  },
];
