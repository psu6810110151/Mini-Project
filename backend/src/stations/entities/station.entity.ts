import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Station {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // ชื่อสถานี (เช่น "หัวลำโพง")

  @Column()
  province: string; // จังหวัด
}