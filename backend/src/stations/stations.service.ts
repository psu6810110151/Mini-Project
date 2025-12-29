import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Station } from './entities/station.entity';
import { CreateStationDto } from './dto/create-station.dto';

@Injectable()
export class StationsService {
  constructor(
    @InjectRepository(Station)
    private stationsRepository: Repository<Station>, // 👈 ต้องมีบรรทัดนี้เพื่อเชื่อม DB
  ) { }

  create(createStationDto: CreateStationDto) {
    return this.stationsRepository.save(createStationDto);
  }

  findAll() {
    return this.stationsRepository.find(); // 👈 ดึงข้อมูลทั้งหมดเป็น Array
  }

  findOne(id: number) {
    return this.stationsRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.stationsRepository.delete(id);
    return { deleted: true };
  }

  async update(id: number, updateStationDto: any) {
    await this.stationsRepository.update(id, updateStationDto);
    return this.stationsRepository.findOneBy({ id });
  }
}