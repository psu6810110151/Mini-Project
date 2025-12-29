import { Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';
export declare class SchedulesService {
    private schedulesRepository;
    constructor(schedulesRepository: Repository<Schedule>);
    create(createScheduleDto: any): Promise<Schedule[]>;
    findAll(): Promise<Schedule[]>;
    findOne(id: number): Promise<Schedule | null>;
    update(id: number, updateScheduleDto: any): Promise<Schedule | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
