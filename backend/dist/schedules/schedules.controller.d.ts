import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
export declare class SchedulesController {
    private readonly schedulesService;
    constructor(schedulesService: SchedulesService);
    create(createScheduleDto: CreateScheduleDto): Promise<any>;
    findAll(): Promise<import("./entities/schedule.entity").Schedule[]>;
    findOne(id: string): Promise<import("./entities/schedule.entity").Schedule | null>;
    update(id: string, updateScheduleDto: UpdateScheduleDto): Promise<import("./entities/schedule.entity").Schedule | null>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
