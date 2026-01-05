import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Station, Schedule, Booking } from './entities';
import { AppController } from './app.controller';
import { SeedService } from './seed.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',          // 👈 เปลี่ยนชนิดเป็น sqlite
      database: 'database.sqlite', // 👈 ชื่อไฟล์ที่จะเก็บข้อมูล (มันจะสร้างให้เอง)
      entities: [User, Station, Schedule, Booking],
      synchronize: true,       // 👈 สร้างตารางให้อัตโนมัติ
    }),
    TypeOrmModule.forFeature([User, Station, Schedule, Booking]),
  ],
  controllers: [AppController],
  providers: [SeedService],
})
export class AppModule {}