import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private schedulesRepository: Repository<Schedule>,
  ) {}

  // 1. ฟังก์ชันสร้างตารางเดินรถ (แก้ปัญหา 500 Error ก่อนหน้านี้)
  async create(createScheduleDto: any) {
    return await this.schedulesRepository.save(createScheduleDto);
  }

  // 2. ฟังก์ชันดึงข้อมูลทั้งหมดพร้อมความสัมพันธ์ (ใช้แสดงผลหน้า Search)
  async findAll() {
    return await this.schedulesRepository.find({
      relations: ['train', 'origin', 'destination'],
    });
  }

  // 3. ฟังก์ชันดึงข้อมูลทีละรายการ (แก้ Error TS2339: findOne)
  async findOne(id: number) {
    return await this.schedulesRepository.findOne({
      where: { id },
      relations: ['train', 'origin', 'destination'],
    });
  }

  // 4. ฟังก์ชันอัปเดตข้อมูล (แก้ Error TS2339: update)
  async update(id: number, updateScheduleDto: any) {
    await this.schedulesRepository.update(id, updateScheduleDto);
    return this.findOne(id);
  }

  // 5. ฟังก์ชันลบข้อมูล (แก้ Error TS2339: remove)
  async remove(id: number) {
    const result = await this.schedulesRepository.delete(id);
    return result;
  }
}