export default interface UserAccountDto {
  id: string;
  email: string;
  password: string;
  role: string;
  status: string;
  employeeId: string;
  createdAt: Date;
  updatedAt: Date;
}
