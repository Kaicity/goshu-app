import { UserRole } from "@/enums/userRolesDto";

export default interface LoginDto {
  email: string;
  password: string;
  role: UserRole;
  employeeId: string;
}
