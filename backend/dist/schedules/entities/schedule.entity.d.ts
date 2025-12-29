import { Train } from '../../trains/entities/train.entity';
import { Station } from '../../stations/entities/station.entity';
export declare class Schedule {
    id: number;
    train: Train;
    origin: Station;
    destination: Station;
    startTime: string;
    endTime: string;
    price: number;
}
