import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity'; // 👈 เช็คบรรทัดนี้ ต้องมี!
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserRole } from './entities/user.entity'; // ถ้ามีการใช้ UserRole
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  // เพิ่มต่อท้ายใน class UsersService
  async findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async create(createUserDto: CreateUserDto) {
    // 1. เข้ารหัส Password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    // 2. สร้าง User Object
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
      // 👇 กันเหนียว: ถ้าไม่ส่ง role มา หรือส่งผิด ให้เป็น USER ไว้ก่อน
      role: createUserDto.role || UserRole.USER,
    });

    // 3. บันทึกลง Database
    return this.usersRepository.save(newUser);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: any) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}