import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 👈 1. ต้อง import ตัวนี้
import { TrainsService } from './trains.service';
import { TrainsController } from './trains.controller';
import { Train } from './entities/train.entity'; // 👈 2. import Entity รถไฟ

@Module({
  imports: [
    TypeOrmModule.forFeature([Train]) // 👈 3. ใส่ตรงนี้เพื่อให้ Service ใช้ Repository ได้
  ],
  controllers: [TrainsController],
  providers: [TrainsService],
})
export class TrainsModule {}