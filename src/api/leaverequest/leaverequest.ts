import { LeaveRequestDto, FiltersLeaveRequest, LeaveRequestPaginationDto, CreateLeaveRequestDto } from '@/models/dto/leaverequestDto';
import { instance } from '../axiosClient';
import { LeaveRequest } from '@/enums/leaveRequestEnum';

export const getLeaveRequests = async (
  page: number,
  limit: number,
  filters: FiltersLeaveRequest,
): Promise<LeaveRequestPaginationDto> => {
  try {
    const response: any = await instance.get('/leaveRequests/getAll', {
      params: {
        page,
        limit,
        employeeId: filters?.employeeId,
        status: filters?.status,
        startDate: filters?.startDate,
        endDate: filters?.endDate,
      },
    });
    return {
      leaveRequest: response.data,
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

export const getLeaveRequestDetail = async (id: string): Promise<any> => {
  try {
    const response = await instance.get(`/leaveRequests/getLeaveRequestDetail/${id}`);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage || 'Mất kết nối đến hệ thống máy chủ');
  }
};

export const createLeaveRequest = async (LeaveRequest: CreateLeaveRequestDto): Promise<any> => {
  try {
    console.log("Payload gửi lên API:", LeaveRequest);
    const response = await instance.post('/leaveRequests/createLeaveRequest', LeaveRequest);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage || 'Mất kết nối đến hệ thống máy chủ');
  }
}
