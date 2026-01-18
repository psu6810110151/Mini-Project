import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; // <--- 1. เพิ่ม import นี้
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Station, Schedule, Booking } from './entities';
import { AppController } from './app.controller';
import { SeedService } from './seed.service';

@Module({
  imports: [
    // 2. โหลด ConfigModule เพื่อให้อ่านไฟล์ .env ได้
    ConfigModule.forRoot({
      isGlobal: true, // ทำให้เรียกใช้ได้ทุกที่ในโปรเจกต์
    }),

    // 3. เปลี่ยนจาก forRoot เป็น forRootAsync
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),      // อ่านค่าจาก .env
        port: configService.get<number>('DB_PORT'),      // อ่านค่าจาก .env
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, Station, Schedule, Booking],    // Entity เดิมของคุณ
        synchronize: true,
      }),
    }),

    TypeOrmModule.forFeature([User, Station, Schedule, Booking]),
  ],
  controllers: [AppController],
  providers: [SeedService],
})
export class AppModule {}