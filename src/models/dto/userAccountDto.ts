import { Status } from "@/enums/statusEnum";
import { UserRole } from "@/enums/userRolesEnum";

export default interface UserAccountDto {
  email: string;
  password: string;
  role: string;
  status: string;
  // employeeId: string;
}
