import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Train {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // ชื่อขบวนรถ (เช่น "ด่วนพิเศษ 9")

  @Column()
  total_seats: number; // จำนวนที่นั่งทั้งหมด
}