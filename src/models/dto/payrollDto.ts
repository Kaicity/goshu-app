import type PaginationDto from './pagination';

interface CreatePayrollDto {
  employeeId?: string;
  month: number;
  year: number;
  basicSalary: number;
  allowance: number;
  overtime: number;
  deductions: number;
  netSalary: number;
}

interface PayrollDto {
  payroll: {
    id: string;
    month: number;
    year: number;
    basicSalary: number;
    allowance: number;
    overtime?: number;
    deductions?: number;
    netSalary: number;
    status: string;
  };
  employee: {
    id: string;
    employeeCode: string;
    firstname?: string;
    lastname?: string;
    avatarUrl?: string;
  };
  createdAt?: string;
}

interface PayrollPaginationDto {
  payrolls: PayrollDto[];
  pagination: PaginationDto;
}

interface FiltersPayroll {
  search?: string;
  employeeId?: string;
  month?: number;
  year?: number;
  status?: string[];
}
export type { CreatePayrollDto, PayrollDto, PayrollPaginationDto, FiltersPayroll };
