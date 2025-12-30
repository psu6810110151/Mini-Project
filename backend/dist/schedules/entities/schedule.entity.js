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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schedule = void 0;
const typeorm_1 = require("typeorm");
const train_entity_1 = require("../../trains/entities/train.entity");
const station_entity_1 = require("../../stations/entities/station.entity");
let Schedule = class Schedule {
    id;
    departure_time;
    arrival_time;
    price;
    train;
    origin;
    destination;
};
exports.Schedule = Schedule;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Schedule.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Schedule.prototype, "departure_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Schedule.prototype, "arrival_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Schedule.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => train_entity_1.Train, (train) => train.id, { eager: true }),
    __metadata("design:type", train_entity_1.Train)
], Schedule.prototype, "train", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => station_entity_1.Station, (station) => station.id, { eager: true }),
    __metadata("design:type", station_entity_1.Station)
], Schedule.prototype, "origin", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => station_entity_1.Station, (station) => station.id, { eager: true }),
    __metadata("design:type", station_entity_1.Station)
], Schedule.prototype, "destination", void 0);
exports.Schedule = Schedule = __decorate([
    (0, typeorm_1.Entity)()
], Schedule);
//# sourceMappingURL=schedule.entity.js.map