import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Train } from './entities/train.entity';

@Injectable()
export class TrainsService {
  constructor(
    @InjectRepository(Train)
    private trainsRepository: Repository<Train>, // 👈 เชื่อมต่อกับฐานข้อมูลตารางรถไฟ
  ) {}

  // 1. ฟังก์ชันสร้างข้อมูลรถไฟ
  async create(createTrainDto: any) {
    return await this.trainsRepository.save(createTrainDto);
  }

  // 2. ฟังก์ชันดึงข้อมูลรถไฟทั้งหมด (ใช้แสดงผลที่หน้า Dashboard)
  async findAll() {
    return await this.trainsRepository.find();
  }

  // 3. ฟังก์ชันดึงข้อมูลรถไฟทีละขบวน (แก้ Error findOne)
  async findOne(id: number) {
    return await this.trainsRepository.findOneBy({ id });
  }

  // 4. ฟังก์ชันอัปเดตข้อมูลรถไฟ (แก้ Error update)
  async update(id: number, updateTrainDto: any) {
    await this.trainsRepository.update(id, updateTrainDto);
    return this.findOne(id);
  }

  // 5. ฟังก์ชันลบข้อมูลรถไฟ (แก้ Error remove ที่คุณเคยเจอ)
  async remove(id: number) {
    return await this.trainsRepository.delete(id);
  }
}