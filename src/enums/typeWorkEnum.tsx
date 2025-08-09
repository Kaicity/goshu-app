export enum TypeWork {
  OFFICE = 'OFFICE',
  REMOTE = 'REMOTE',
}

export const TYPEWORK_LABELS: Record<TypeWork, string> = {
  [TypeWork.OFFICE]: 'Tại trụ sở',
  [TypeWork.REMOTE]: 'Từ xa',
};
