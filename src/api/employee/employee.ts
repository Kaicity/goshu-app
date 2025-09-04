import { EmployeeFilterDto, EmployeePaginationDto, EmployeeFormDto } from '@/models/dto/employeeDto';
import { instance } from '../axiosClient';

export const getEmployees = async (page: number, limit: number, filters: EmployeeFilterDto): Promise<EmployeePaginationDto> => {
  try {
    const response: any = await instance.get('/employees/getAll', {
      params: {
        page,
        limit,
        search: filters.search,
        department: filters.departments,
        type: filters.typeWorks,
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
    throw new Error(errorMessage || 'Đã có lỗi xảy ra');
  }
};

export const updateEmployee = async (id: string, employee: Partial<EmployeeFormDto>): Promise<any> => {
  try {
    const response = await instance.put(`/employees/updateEmployee/${id}`, employee);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage || 'Đã có lỗi xảy ra');
  }
};

export const getEmployee = async (id: string): Promise<any> => {
  try {
    const response = await instance.get(`/employees/getEmployee/${id}`);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage || 'Đã có lỗi xảy ra');
  }
};
