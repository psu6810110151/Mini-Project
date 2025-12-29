// backend/src/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 1. เพิ่มบรรทัดนี้
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity'; // 2. เพิ่มบรรทัดนี้

@Module({
  imports: [
    TypeOrmModule.forFeature([User]) // 👈 3. สำคัญมาก! ต้องมีบรรทัดนี้
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // เอาไว้ให้ AuthModule เรียกใช้
})
export class UsersModule {}