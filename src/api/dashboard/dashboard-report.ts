import { instance } from '../axiosClient';

export const getDashBoardReportSummary = async (month: number, year: number): Promise<any> => {
  try {
    const response = await instance.get('/dashboard-report/summary', { params: { month, year } });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage || 'Đã có lỗi xảy ra');
  }
};
