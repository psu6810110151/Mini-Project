import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module'; // 👈 1. ต้อง import บรรทัดนี้
import { TrainsModule } from './trains/trains.module';
import { StationsModule } from './stations/stations.module';
import { User } from './users/entities/user.entity';
import { Train } from './trains/entities/train.entity';
import { Station } from './stations/entities/station.entity';
import { SchedulesModule } from './schedules/schedules.module';
import { Schedule } from './schedules/entities/schedule.entity'; // 👈 1. import มาไว้ที่นี่ด้วย

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'admin',
      password: 'password123',
      database: 'railway_ticket_db',
      // 👈 2. เพิ่ม Schedule เข้าไปใน array นี้
      entities: [User, Train, Station, Schedule], 
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    TrainsModule,
    StationsModule,
    SchedulesModule, // 👈 3. ตรวจสอบว่ามีชื่อนี้ใน imports หรือยัง
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}