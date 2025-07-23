import { Status } from "@/enums/statusEnum";
import { UserRole } from "@/enums/userRolesEnum";

export default interface UserAccountDto {
  id?: string;
  email: string;
  password: string;
  role: string;
  status: string;
  // employeeId: string;
}
