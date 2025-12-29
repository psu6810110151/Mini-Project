import { TrainsService } from './trains.service';
import { CreateTrainDto } from './dto/create-train.dto';
import { UpdateTrainDto } from './dto/update-train.dto';
export declare class TrainsController {
    private readonly trainsService;
    constructor(trainsService: TrainsService);
    create(createTrainDto: CreateTrainDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTrainDto: UpdateTrainDto): string;
    remove(id: string): string;
}
