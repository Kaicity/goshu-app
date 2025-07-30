import { PaginationDto } from "./pagination";

export default interface UserAccountDto {
  id?: string;
  email: string;
  password?: string;
  role: string;
  status?: string;
  employeeId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserAccountPaginationDto {
  userAccounts: UserAccountDto[];
  pagination: PaginationDto;
}

export interface UserAccountFilterDto {
  role?: string;
  status?: string;
  search?: string;
}
