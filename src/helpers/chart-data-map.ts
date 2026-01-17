export const buildPayrollChartData = (apiData: any[]) => {
  const monthMap = new Map(apiData.map((item) => [item.month, item]));

  return Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const data = monthMap.get(month);

    return {
      label: `Thg ${month}`,
      netSalary: data?.netSalary ?? 0,
      deductions: data?.deductions ?? 0,
    };
  });
};
