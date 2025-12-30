import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Train } from '../../trains/entities/train.entity';
import { Station } from '../../stations/entities/station.entity';

@Entity()
export class Schedule {
    @PrimaryGeneratedColumn()
    id: number;

    // ในไฟล์ schedule.entity.ts

    @Column({ nullable: true }) // 👈 เพิ่มตรงนี้เพื่อให้ DB ยอมรับค่าว่างได้
    departure_time: string;

    @Column({ nullable: true }) // 👈 ทำเหมือนกันที่ arrival_time และ price เพื่อป้องกัน Error อื่น
    arrival_time: string;

    @Column({ nullable: true })
    price: number;

    // เชื่อมกับรถไฟ
    @ManyToOne(() => Train, (train) => train.id, { eager: true })
    train: Train;

    // เชื่อมกับสถานีต้นทาง
    @ManyToOne(() => Station, (station) => station.id, { eager: true })
    origin: Station;

    // เชื่อมกับสถานีปลายทาง
    @ManyToOne(() => Station, (station) => station.id, { eager: true })
    destination: Station;

}