import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 👈 1. ต้อง import ตัวนี้
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { Schedule } from './entities/schedule.entity'; // 👈 2. import Entity ของเรา

@Module({
  imports: [TypeOrmModule.forFeature([Schedule])], // 👈 3. ใส่ใน imports เพื่อให้ใช้ Repository ได้
  controllers: [SchedulesController],
  providers: [SchedulesService],
})
export class SchedulesModule {}