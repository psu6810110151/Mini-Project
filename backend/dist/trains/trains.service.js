"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const train_entity_1 = require("./entities/train.entity");
let TrainsService = class TrainsService {
    trainsRepository;
    constructor(trainsRepository) {
        this.trainsRepository = trainsRepository;
    }
    async create(createTrainDto) {
        return await this.trainsRepository.save(createTrainDto);
    }
    async findAll() {
        return await this.trainsRepository.find();
    }
    async findOne(id) {
        return await this.trainsRepository.findOneBy({ id });
    }
    async update(id, updateTrainDto) {
        await this.trainsRepository.update(id, updateTrainDto);
        return this.findOne(id);
    }
    async remove(id) {
        return await this.trainsRepository.delete(id);
    }
};
exports.TrainsService = TrainsService;
exports.TrainsService = TrainsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(train_entity_1.Train)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TrainsService);
//# sourceMappingURL=trains.service.js.map