// types/dashboard.ts
export interface DashboardMetric {
  value: number;
  percent: number | null;
}

export interface DashboardSummary {
  totalEmployees: DashboardMetric;
  newEmployees: DashboardMetric;
  resignedEmployees: DashboardMetric;
}
