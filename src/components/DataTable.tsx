'use client';

import { DataTablePagination } from '@/components/TablePagination';
import { Spinner } from '@/components/ui/spinner';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { PackageOpen } from 'lucide-react';
import { useState } from 'react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  page: number;
  limit: number;
  total: number;
  onPaginationChange?: (page: number, limit: number) => void;
  loading?: boolean;
  showPagination?: boolean;
  showTable?: boolean;
  showFooter?: boolean;
  titleFooter?: string;
  totalValueFooter?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  page,
  limit,
  total,
  loading,
  onPaginationChange,
  showPagination = true,
  showTable = true,
  showFooter = false,
  titleFooter,
  totalValueFooter = 0,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const totalpages = Math.ceil(total / limit);

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    pageCount: totalpages,
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize: limit,
      },
      sorting,
      rowSelection,
    },
    onPaginationChange: (updater) => {
      const next =
        typeof updater === 'function'
          ? updater({
              pageIndex: page - 1,
              pageSize: limit,
            })
          : updater;

      onPaginationChange?.(next.pageIndex + 1, next.pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
  });

  return (
    <div className="rounded-md border p-4">
      {showTable && (
        <Table>
          <TableHeader className="bg-secondary">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <Spinner /> Loading
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="flex flex-col gap-2 items-center text-muted-foreground">
                    <PackageOpen />
                    <span className="text-xs">Không có dữ liệu</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {showFooter && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={columns.length - 1}>Tổng cộng:</TableCell>
                <TableCell className="text-right">
                  {totalValueFooter}
                  {titleFooter}
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      )}
      {showPagination && <DataTablePagination table={table} />}
    </div>
  );
}
