import { Repository } from 'typeorm';
import { Train } from './entities/train.entity';
export declare class TrainsService {
    private trainsRepository;
    constructor(trainsRepository: Repository<Train>);
    create(createTrainDto: any): Promise<any>;
    findAll(): Promise<Train[]>;
    findOne(id: number): Promise<Train | null>;
    update(id: number, updateTrainDto: any): Promise<Train | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
