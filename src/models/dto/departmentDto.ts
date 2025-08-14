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

interface DepartmentFilterDto{
    search: string;
    
}
export type { DepartmentDto, DepartmentPaginationDto, DepartmentFilterDto };