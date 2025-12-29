// backend/src/users/dto/create-user.dto.ts
import { UserRole } from '../entities/user.entity'; // 👈 Import Enum มาใช้

export class CreateUserDto {
  username: string;
  password: string;
  email: string;
  role?: UserRole; // 👈 แก้จาก string เป็น UserRole
}