import { TrainsService } from './trains.service';
import { CreateTrainDto } from './dto/create-train.dto';
import { UpdateTrainDto } from './dto/update-train.dto';
export declare class TrainsController {
    private readonly trainsService;
    constructor(trainsService: TrainsService);
    create(createTrainDto: CreateTrainDto): Promise<any>;
    findAll(): Promise<import("./entities/train.entity").Train[]>;
    findOne(id: string): Promise<import("./entities/train.entity").Train | null>;
    update(id: string, updateTrainDto: UpdateTrainDto): Promise<import("./entities/train.entity").Train | null>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
