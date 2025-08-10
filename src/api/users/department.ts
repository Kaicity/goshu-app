import { DepartmentDto, DepartmentFilterDto, DepartmentPaginationDto } from '@/models/dto/departmentDto';
import { instance } from '../axiosClient';

export const getDepartments = async (
  page: number,
  limit: number,
  filters: DepartmentFilterDto,
): Promise<DepartmentPaginationDto> => {
  try {
    const response: any = await instance.get('/departments/getAll', {
      params: { page, limit, search: filters.search },
    });
    return {
      departments: response.data,
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

export const createDepartment = async (department: DepartmentDto): Promise<any> => {
  try {
    const response = await instance.post('/departments/createDepartment', department);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage || 'Mất kết nối đến hệ thống máy chủ');
  }
};

export const deleteDepartment = async (id: string): Promise<boolean> => {
  try {
    const response = await instance.delete(`/departments/deleteDeparment/${encodeURIComponent(id)}`);
    console.log("Delete department response:", response);
    if (response.data?.statusCode === 201) {
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }
};
