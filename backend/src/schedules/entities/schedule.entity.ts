import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Train } from '../../trains/entities/train.entity';
import { Station } from '../../stations/entities/station.entity';

@Entity()
export class Schedule {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Train, { eager: true })
    train: Train; // เชื่อมกับรถไฟ

    @ManyToOne(() => Station, { eager: true })
    origin: Station; // สถานีต้นทาง

    @ManyToOne(() => Station, { eager: true })
    destination: Station; // สถานีปลายทาง
    @Column()
    startTime: string; // เปลี่ยนจาก departure_time เป็น startTime

    @Column()
    endTime: string;

    @Column('decimal')
    price: number; // ราคาตั๋ว
}