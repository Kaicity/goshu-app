import { PaginationDto } from "./userAccountDto";

interface DepartmentDto {
    id?: string,
    name: string,
    description: string,
    updatedAt?: Date,
}

interface DepartmentPaginationDto {
    departments: DepartmentDto[];
    pagination: PaginationDto;
}

export type { DepartmentDto, DepartmentPaginationDto };