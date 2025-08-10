export enum Marital {
  SINGLE = 'SINGLE',
  MARRIED = 'MARRIED',
  DIVORCED = 'DIVORCED',
}

export const MARITAL_LABELS: Record<Marital, string> = {
  [Marital.SINGLE]: 'Độc thân',
  [Marital.MARRIED]: 'Đã kết hôn',
  [Marital.DIVORCED]: 'Ly hôn',
};
