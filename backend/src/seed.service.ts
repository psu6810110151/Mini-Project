import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Station, Schedule } from './entities'; // ดึง Entity จากไฟล์ entities.ts ที่เพิ่งสร้าง

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Station) private stationRepo: Repository<Station>,
    @InjectRepository(Schedule) private scheduleRepo: Repository<Schedule>,
  ) {}

  // ฟังก์ชันนี้จะทำงานทันทีที่ Server เริ่มรัน
  async onApplicationBootstrap() {
    // เช็คก่อนว่ามีข้อมูลสถานีหรือยัง? ถ้ายังไม่มี (count = 0) ถึงจะสร้าง
    const count = await this.stationRepo.count();
    
    if (count === 0) {
      console.log('🌱 กำลังสร้างข้อมูลจำลอง (Seeding Data)...');
      
      // 1. สร้างสถานี
      const bkk = await this.stationRepo.save({ name: 'กรุงเทพ (Bangkok)' });
      const cnx = await this.stationRepo.save({ name: 'เชียงใหม่ (Chiang Mai)' });
      const kka = await this.stationRepo.save({ name: 'ขอนแก่น (Khon Kaen)' });
      const hat = await this.stationRepo.save({ name: 'หาดใหญ่ (Hat Yai)' });

      // 2. สร้างรอบรถ (กำหนดต้นทาง-ปลายทาง และจำนวนที่นั่ง)
      await this.scheduleRepo.save([
        // สายเหนือ
        { origin: bkk, destination: cnx, price: 500, startTime: '08:00', totalSeats: 20 },
        { origin: cnx, destination: bkk, price: 500, startTime: '19:00', totalSeats: 20 },
        
        // สายอีสาน
        { origin: bkk, destination: kka, price: 350, startTime: '10:30', totalSeats: 15 },
        { origin: kka, destination: bkk, price: 350, startTime: '21:00', totalSeats: 15 },

        // สายใต้
        { origin: bkk, destination: hat, price: 700, startTime: '14:00', totalSeats: 30 },
      ]);
      
      console.log('✅ สร้างข้อมูลเสร็จแล้ว! พร้อมใช้งาน');
    }
  }
}