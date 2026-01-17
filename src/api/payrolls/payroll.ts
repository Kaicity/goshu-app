import type { CreatePayrollDto, FiltersPayroll, PayrollPaginationDto } from '@/models/dto/payrollDto';
import { instance } from '../axiosClient';

export const getPayrolls = async (page: number, limit: number, filters: FiltersPayroll): Promise<PayrollPaginationDto> => {
  try {
    const response: any = await instance.get('/payrolls/getAll', {
      params: {
        page,
        limit,
        search: filters.search,
        employeeId: filters?.employeeId,
        status: filters?.status,
        month: filters?.month,
        year: filters?.year,
      },
    });
    return {
      payrolls: response.data,
      pagination: {
        page: response.pagination.currentPage,
        limit: response.pagination.limit,
        total: response.pagination.totalItems,
      },
    };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage || 'Đã có lỗi xảy ra');
  }
};

export const getPayroll = async (id: string): Promise<any> => {
  try {
    const response = await instance.get(`/payrolls/getPayroll/${id}`);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage || 'Đã có lỗi xảy ra');
  }
};

export const createPayroll = async (payroll: CreatePayrollDto): Promise<any> => {
  try {
    const response = await instance.post('/payrolls/createPayroll', payroll);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage || 'Đã có lỗi xảy ra');
  }
};

export const generatePayrollAllEmployees = async (year: number, month: number): Promise<any> => {
  try {
    const response = await instance.post('/payrolls/createPayrollAllEmployees', { year, month });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage || 'Đã có lỗi xảy ra');
  }
};

export const updatePayroll = async (id: string, payroll: any): Promise<any> => {
  try {
    const response = await instance.put(`/payrolls/updatePayroll/${id}`, payroll);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage || 'Đã có lỗi xảy ra');
  }
};

export const completePayroll = async (): Promise<any> => {
  try {
    const response = await instance.post('/payrolls/completePayroll');
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage || 'Đã có lỗi xảy ra');
  }
};
