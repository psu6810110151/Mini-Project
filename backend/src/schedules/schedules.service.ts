// ใน backend/src/schedules/schedules.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private schedulesRepository: Repository<Schedule>,
  ) { }

  async create(createScheduleDto: any) {
    // ใช้ save เพื่อให้ TypeORM จัดการเรื่องความสัมพันธ์ ID ให้อัตโนมัติ
    const newSchedule = this.schedulesRepository.create(createScheduleDto);
    return await this.schedulesRepository.save(newSchedule);
  }

  findAll() {
    // เพิ่ม relations เพื่อให้ดึงข้อมูลรถไฟและสถานีออกมาด้วย
    return this.schedulesRepository.find({
      relations: ['train', 'origin', 'destination']
    });
  }

  async findOne(id: number) {
    return await this.schedulesRepository.findOneBy({ id } as any);
  }

  async update(id: number, updateScheduleDto: any) {
    await this.schedulesRepository.update(id, updateScheduleDto);
    return this.findOne(id);
  }

  // ปรับ remove ให้ใช้ .delete(id) จะง่ายและเร็วกว่า ไม่ต้องหาตัวแปรมาพัก
  async remove(id: number) {
    return await this.schedulesRepository.delete(id);
  }

}