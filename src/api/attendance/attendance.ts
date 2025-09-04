import type { AttendanceFilters, AttendancePaginationDto } from '@/models/dto/attendanceDto';
import { instance } from '../axiosClient';

export const checkIn = async (employeeId: string): Promise<any> => {
  try {
    const response = await instance.post('/attendances/checkIn', { employeeId });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage || 'Đã có lỗi xảy ra');
  }
};

export const checkOut = async (employeeId: string): Promise<any> => {
  try {
    const response = await instance.post('/attendances/checkOut', { employeeId });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage || 'Đã có lỗi xảy ra');
  }
};

export const getAttendances = async (
  page: number,
  limit: number,
  filters: AttendanceFilters,
): Promise<AttendancePaginationDto> => {
  try {
    const response: any = await instance.get('/attendances/getAll', {
      params: {
        page,
        limit,
        employeeId: filters?.employeeId,
        search: filters?.search,
        date: filters?.date,
        status: filters.status,
      },
    });
    return {
      attendances: response.data,
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

export const generateAttendanceForAllEmployees = async (year: number, month: number) => {
  try {
    const response = await instance.post('/attendances/generateAttendances', { year, month });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage || 'Đã có lỗi xảy ra');
  }
};
