import { EmployeePaginationDto } from '@/models/dto/employeeDto';
import { instance } from '../axiosClient';

export const getEmployees = async (page: number, limit: number): Promise<EmployeePaginationDto> => {
  try {
    const response: any = await instance.get('/employees/getAll', {
      params: {
        page,
        limit,
      },
    });
    return {
      employees: response.data,
      pagination: {
        page: response.pagination.currentPage,
        limit: response.pagination.limit,
        total: response.pagination.totalItems,
      },
    };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage || 'Mất kết nối đến hệ thống máy chủ');
  }
};
