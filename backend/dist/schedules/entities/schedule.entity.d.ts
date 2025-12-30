import { Train } from '../../trains/entities/train.entity';
import { Station } from '../../stations/entities/station.entity';
export declare class Schedule {
    id: number;
    departure_time: string;
    arrival_time: string;
    price: number;
    train: Train;
    origin: Station;
    destination: Station;
}
