import { StationsService } from './stations.service';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
export declare class StationsController {
    private readonly stationsService;
    constructor(stationsService: StationsService);
    create(createStationDto: CreateStationDto): Promise<CreateStationDto & import("./entities/station.entity").Station>;
    findAll(): Promise<import("./entities/station.entity").Station[]>;
    findOne(id: string): Promise<import("./entities/station.entity").Station | null>;
    update(id: string, updateStationDto: UpdateStationDto): Promise<import("./entities/station.entity").Station | null>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
