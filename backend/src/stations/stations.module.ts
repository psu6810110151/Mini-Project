import { Module } from '@nestjs/common';
import { StationsService } from './stations.service';
import { StationsController } from './stations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Station } from './entities/station.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Station])], // 👈 เพิ่มบรรทัดนี้
  controllers: [StationsController],
  providers: [StationsService],
})
export class StationsModule {}