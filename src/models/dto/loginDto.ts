import { Status } from "@/enums/statusEnum";
import { UserRole } from "@/enums/userRolesEnum";

export default interface LoginDto {
  email: string;
  password: string;
  role: UserRole;
  status: Status;
  employeeId: string;
}
