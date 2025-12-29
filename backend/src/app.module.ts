import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,              // ตรงกับ docker-compose.yml ของคุณ
      username: 'admin',       // ตรงกับ POSTGRES_USER
      password: 'password123', // ตรงกับ POSTGRES_PASSWORD
      database: 'railway_ticket_db', // ตรงกับ POSTGRES_DB
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // โหลด Entity อัตโนมัติ
      synchronize: true,       // (Dev Only) แก้โค้ดแล้วแก้ตารางใน DB ให้เลย
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}