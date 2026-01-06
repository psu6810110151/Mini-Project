import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];
}

@Entity()
export class Station {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  // ✅ ชื่อขบวน จำกัด 20 ตัวอักษร
  @Column({ length: 20 })
  trainName: string;

  @ManyToOne(() => Station)
  origin: Station;

  @ManyToOne(() => Station)
  destination: Station;

  @Column()
  price: number;

  @Column()
  startTime: string; // เวลาออกรถ

  // ✅ [Phase 10] เพิ่มประเภทรถ (เช่น รถพัดลม, รถแอร์)
  @Column({ default: 'fan' }) 
  type: string;

  // ✅ [Phase 10] เพิ่มตัวคูณราคา (เช่น 1.0, 1.5) เก็บเป็นทศนิยม
  @Column('float', { default: 1.0 }) 
  priceMultiplier: number;

  @OneToMany(() => Booking, (booking) => booking.schedule)
  bookings: Booking[];
}

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  // ✅ เวลาที่กดจอง (ระบบบันทึกให้อัตโนมัติ)
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  travelDate: string;

  @Column()
  seatNumber: string;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;

  @ManyToOne(() => Schedule, (schedule) => schedule.bookings)
  schedule: Schedule;
}