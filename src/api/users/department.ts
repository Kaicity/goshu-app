import { DepartmentDto, DepartmentPaginationDto } from '@/models/dto/departmentDto';
import { instance } from '../axiosClient';

export const getDepartments = async (page: number, limit: number): Promise<DepartmentPaginationDto> => {
  try {
    const response: any = await instance.get('/departments/getAll', {
      params: { page, limit },
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
    } catch (error: any){
        const errorMessage = error.response?.data?.message;
        throw new Error(errorMessage || 'Mất kết nối đến hệ thống máy chủ');
    }
}