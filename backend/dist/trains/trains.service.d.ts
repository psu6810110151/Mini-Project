import { CreateTrainDto } from './dto/create-train.dto';
import { UpdateTrainDto } from './dto/update-train.dto';
export declare class TrainsService {
    create(createTrainDto: CreateTrainDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTrainDto: UpdateTrainDto): string;
    remove(id: number): string;
}
