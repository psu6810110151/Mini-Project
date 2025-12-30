"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const trains_service_1 = require("./trains.service");
const trains_controller_1 = require("./trains.controller");
const train_entity_1 = require("./entities/train.entity");
let TrainsModule = class TrainsModule {
};
exports.TrainsModule = TrainsModule;
exports.TrainsModule = TrainsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([train_entity_1.Train])
        ],
        controllers: [trains_controller_1.TrainsController],
        providers: [trains_service_1.TrainsService],
    })
], TrainsModule);
//# sourceMappingURL=trains.module.js.map