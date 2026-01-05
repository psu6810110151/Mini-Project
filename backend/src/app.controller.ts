import { Controller, Get, Post, Body, Param, Delete, Query, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, Station, Schedule, Booking } from './entities';

// --- ข้อมูลสถานี (รวมสายใต้ นครศรีฯ แล้ว) ---
const REAL_STATIONS = [
  "กรุงเทพอภิวัฒน์ (Bang Sue)", "อยุธยา", "ลพบุรี", "นครสวรรค์", "พิจิตร", "พิษณุโลก", "อุตรดิตถ์", "เด่นชัย", "ลำปาง", "ลำพูน", "เชียงใหม่",
  "สระบุรี", "ปากช่อง", "นครราชสีมา", "บุรีรัมย์", "สุรินทร์", "ศรีสะเกษ", "อุบลราชธานี",
  "ขอนแก่น", "อุดรธานี", "หนองคาย",
  "นครปฐม", "ราชบุรี", "เพชรบุรี", "หัวหิน", "ชุมพร", "สุราษฎร์ธานี", "นครศรีธรรมราช", "พัทลุง", "หาดใหญ่", "ยะลา", "สุไหงโก-ลก",
  "ฉะเชิงเทรา", "ชลบุรี", "พัทยา", "บ้านพลูตาหลวง"
];

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Station) private stationRepo: Repository<Station>,
    @InjectRepository(Schedule) private scheduleRepo: Repository<Schedule>,
    @InjectRepository(Booking) private bookingRepo: Repository<Booking>,
  ) {}

  // --- ระบบ Reset ข้อมูลอัตโนมัติเมื่อเริ่ม Server ---
  async onModuleInit() {
    const count = await this.stationRepo.count();
    // ถ้าจำนวนสถานีไม่ตรง (เช่น เพิ่มสายใต้มาใหม่) ให้ล้างข้อมูลแล้วลงใหม่
    if (count < REAL_STATIONS.length) {
      console.log('🚧 ตรวจพบข้อมูลใหม่! กำลังรีเซ็ตฐานข้อมูลสถานีและรอบรถไฟ...');
      try {
        await this.bookingRepo.clear();  // ล้างการจองเก่า (ระวัง: ข้อมูลหายหมด)
        await this.scheduleRepo.clear(); // ล้างรอบรถ
        await this.stationRepo.clear();  // ล้างสถานี
      } catch (e) { console.log('⚠️ Info: Database Init'); }

      // 1. สร้างสถานีใหม่
      const stationMap = new Map<string, Station>();
      for (const name of REAL_STATIONS) {
        const station = await this.stationRepo.save({ name });
        stationMap.set(name, station);
      }
      const getStation = (name: string) => stationMap.get(name);

      // 2. ข้อมูลเที่ยวรถ (รวมสายใต้ Train 85)
      const schedules = [
        { train: "ด่วนพิเศษ 9 (อุตราวิถี)", origin: "กรุงเทพอภิวัฒน์ (Bang Sue)", dest: "เชียงใหม่", time: "18:10", price: 1041 },
        { train: "ด่วนพิเศษ 7", origin: "กรุงเทพอภิวัฒน์ (Bang Sue)", dest: "เชียงใหม่", time: "08:30", price: 641 },
        { train: "ด่วน 51", origin: "กรุงเทพอภิวัฒน์ (Bang Sue)", dest: "เชียงใหม่", time: "22:00", price: 431 },
        { train: "เร็ว 109", origin: "กรุงเทพอภิวัฒน์ (Bang Sue)", dest: "เชียงใหม่", time: "13:30", price: 231 },
        { train: "ด่วนพิเศษ 23 (อีสานวัตนา)", origin: "กรุงเทพอภิวัฒน์ (Bang Sue)", dest: "อุบลราชธานี", time: "20:30", price: 950 },
        { train: "ด่วน 71", origin: "กรุงเทพอภิวัฒน์ (Bang Sue)", dest: "อุบลราชธานี", time: "10:05", price: 400 },
        { train: "ด่วนพิเศษ 25 (อีสานมรรคา)", origin: "กรุงเทพอภิวัฒน์ (Bang Sue)", dest: "หนองคาย", time: "20:00", price: 980 },
        { train: "ด่วน 75", origin: "กรุงเทพอภิวัฒน์ (Bang Sue)", dest: "หนองคาย", time: "08:20", price: 450 },
        { train: "ด่วนพิเศษ 31 (ทักษิณารัถย์)", origin: "กรุงเทพอภิวัฒน์ (Bang Sue)", dest: "หาดใหญ่", time: "14:30", price: 1100 },
        { train: "ด่วนพิเศษ 43", origin: "กรุงเทพอภิวัฒน์ (Bang Sue)", dest: "สุราษฎร์ธานี", time: "08:05", price: 550 },
        
        // --- สายใต้ที่ต้องการ ---
        { train: "ด่วน 85", origin: "กรุงเทพอภิวัฒน์ (Bang Sue)", dest: "นครศรีธรรมราช", time: "19:30", price: 600 },
        
        { train: "นำเที่ยว 909", origin: "กรุงเทพอภิวัฒน์ (Bang Sue)", dest: "น้ำตก (กาญจนบุรี)", time: "06:30", price: 120 }, 
        { train: "ธรรมดา 283", origin: "กรุงเทพอภิวัฒน์ (Bang Sue)", dest: "บ้านพลูตาหลวง", time: "06:55", price: 40 },
      ];

      for (const s of schedules) {
        const origin = getStation(s.origin);
        const dest = getStation(s.dest);
        if (origin && dest) {
          // ขาไป
          await this.scheduleRepo.save({ origin, destination: dest, trainName: s.train, price: s.price, startTime: s.time });
          
          // ขากลับ (คำนวณเวลาคร่าวๆ +12 ชม.)
          const [hr, min] = s.time.split(':').map(Number);
          const returnTime = `${(hr + 12) % 24}`.padStart(2,'0') + `:${min}`;
          await this.scheduleRepo.save({ 
            origin: dest, 
            destination: origin, 
            trainName: s.train.replace('ด่วนพิเศษ', 'กลับ').replace('ด่วน', 'กลับ'), 
            price: s.price, 
            startTime: returnTime 
          });
        }
      }
      console.log('✅ System Ready: Data seeded successfully!');
    }
  }

  // --- API Routes ---

  @Post('register')
  async register(@Body() body: any) {
    const exists = await this.userRepo.findOneBy({ username: body.username });
    if (exists) return { status: 'error', message: 'ชื่อนี้มีคนใช้แล้ว' };
    const newUser = await this.userRepo.save(body);
    return { status: 'success', user: newUser };
  }

  @Post('login')
  async login(@Body() body: any) {
    const user = await this.userRepo.findOneBy({ username: body.username, password: body.password });
    if (!user) return { status: 'error', message: 'ชื่อหรือรหัสผ่านผิด' };
    const role = user.username === 'admin' ? 'admin' : 'user';
    return { status: 'success', user: { ...user, role } };
  }

  @Get('stations')
  async getStations() { return this.stationRepo.find({ order: { name: 'ASC' } }); }

  @Get('search')
  async searchTrain(@Query('origin') originId: number, @Query('dest') destId: number) {
    return this.scheduleRepo.find({ where: { origin: { id: originId }, destination: { id: destId } }, relations: ['origin', 'destination'] });
  }

  @Get('check-seats')
  async checkSeats(@Query('scheduleId') scheduleId: number, @Query('date') date: string) {
    const bookings = await this.bookingRepo.find({ where: { schedule: { id: scheduleId }, travelDate: date }, select: ['seatNumber'] });
    return bookings.map(b => b.seatNumber);
  }

  @Post('book')
  async bookTicket(@Body() body: any) {
    const { userId, scheduleId, date, seatNumber } = body;
    const user = await this.userRepo.findOneBy({ id: userId });
    const schedule = await this.scheduleRepo.findOneBy({ id: scheduleId });
    if (!user || !schedule) return { status: 'error', message: 'ข้อมูลไม่ถูกต้อง' };
    
    // เช็คว่าที่นั่งซ้ำไหม
    const isTaken = await this.bookingRepo.findOneBy({ schedule: { id: scheduleId }, travelDate: date, seatNumber });
    if (isTaken) return { status: 'error', message: 'ที่นั่งนี้ถูกจองไปแล้ว' };

    // 🔥 สร้าง PNR (รหัสตั๋ว) แบบสุ่ม เช่น "X7B29A"
    const pnr = Math.random().toString(36).substring(2, 8).toUpperCase();

    // บันทึกการจอง (เพิ่ม status: 'confirmed' เพื่อให้ Admin รู้ว่าจ่ายแล้ว)
    // *หมายเหตุ: ต้องแน่ใจว่า Entity Booking ของคุณมี field 'pnr' และ 'status' 
    // ถ้ายังไม่มี field ให้ลบ pnr/status ออกก่อนแล้วไปเติมใน Entity
    await this.bookingRepo.save({ 
      user, 
      schedule, 
      travelDate: date, 
      seatNumber, 
      pnr: pnr, 
      status: 'confirmed' 
    });

    return { status: 'success', message: 'จองสำเร็จ!', pnr };
  }

  @Get('my-bookings')
  async getMyBookings(@Query('userId') userId: number) {
    return this.bookingRepo.find({ where: { user: { id: userId } }, relations: ['schedule', 'schedule.origin', 'schedule.destination'], order: { createdAt: 'DESC' } });
  }

  // --- API สำหรับ Admin ---
  @Get('all-bookings')
  async getAllBookings() {
    return this.bookingRepo.find({
      relations: ['user', 'schedule', 'schedule.origin', 'schedule.destination'], 
      order: { createdAt: 'DESC' } // เรียงจากล่าสุดไปเก่าสุดเสมอ
    });
  }

  @Delete('bookings/:id')
  async cancelBooking(@Param('id') id: number) {
    // ในระบบจริงอาจจะเช็คก่อนว่า status confirmed ไหม ถ้าใช่ห้ามลบ
    await this.bookingRepo.delete(id);
    return { status: 'success', message: '✅ ยกเลิกเรียบร้อย' };
  }
}