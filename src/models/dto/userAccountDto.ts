import PaginationDto from "./pagination";

interface UserAccountDto {
  id?: string;
  email: string;
  password?: string;
  role: string;
  status?: string;
  employeeId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserAccountPaginationDto {
  userAccounts: UserAccountDto[];
  pagination: PaginationDto;
}

interface UserAccountFilterDto {
  role?: string[];
  status?: string[];
  search?: string;
}

export type {
  UserAccountDto,
  UserAccountPaginationDto,
  UserAccountFilterDto,
  PaginationDto,
};
