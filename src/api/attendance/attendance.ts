import type { AttendancePaginationDto } from '@/models/dto/attendanceDto';
import { instance } from '../axiosClient';

export const checkIn = async (employeeId: string): Promise<any> => {
  try {
    const response = await instance.post('/attendances/checkIn', { employeeId });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage || 'Mất kết nối đến hệ thống máy chủ');
  }
};

export const checkOut = async (employeeId: string): Promise<any> => {
  try {
    const response = await instance.post('/attendances/checkOut', { employeeId });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage || 'Mất kết nối đến hệ thống máy chủ');
  }
};

export const getAttendances = async (page: number, limit: number, employeeId: string): Promise<AttendancePaginationDto> => {
  try {
    const response: any = await instance.get('/attendances/getAll', {
      params: { page, limit, employeeId },
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
    throw new Error(errorMessage || 'Mất kết nối đến hệ thống máy chủ');
  }
};
