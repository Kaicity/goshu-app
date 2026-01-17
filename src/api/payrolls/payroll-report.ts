import { instance } from '../axiosClient';

export const getAvailablePayrollYear = async (): Promise<any> => {
  try {
    const response = await instance.get('/payrolls-report/available-years');
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage || 'Đã có lỗi xảy ra');
  }
};

export const getSalaryStructureByMonth = async (year: number): Promise<any> => {
  try {
    const response = await instance.get('/payrolls-report/salary-structure-by-month', {
      params: {
        year,
      },
    });

    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage || 'Đã có lỗi xảy ra');
  }
};

export const getSalaryRatio = async (month: number, year: number): Promise<any> => {
  try {
    const response = await instance.get('/payrolls-report/salary-ratio', {
      params: {
        month,
        year,
      },
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage || 'Đã có lỗi xảy ra');
  }
};

export const getSalaryStatusRatio = async (month: number, year: number): Promise<any> => {
  try {
    const response = await instance.get('/payrolls-report/payroll-status-ratio', {
      params: {
        month,
        year,
      },
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage || 'Đã có lỗi xảy ra');
  }
};
