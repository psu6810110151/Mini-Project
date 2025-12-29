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
exports.TrainsController = void 0;
const common_1 = require("@nestjs/common");
const trains_service_1 = require("./trains.service");
const create_train_dto_1 = require("./dto/create-train.dto");
const update_train_dto_1 = require("./dto/update-train.dto");
let TrainsController = class TrainsController {
    trainsService;
    constructor(trainsService) {
        this.trainsService = trainsService;
    }
    create(createTrainDto) {
        return this.trainsService.create(createTrainDto);
    }
    findAll() {
        return this.trainsService.findAll();
    }
    findOne(id) {
        return this.trainsService.findOne(+id);
    }
    update(id, updateTrainDto) {
        return this.trainsService.update(+id, updateTrainDto);
    }
    remove(id) {
        return this.trainsService.remove(+id);
    }
};
exports.TrainsController = TrainsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_train_dto_1.CreateTrainDto]),
    __metadata("design:returntype", void 0)
], TrainsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TrainsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrainsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_train_dto_1.UpdateTrainDto]),
    __metadata("design:returntype", void 0)
], TrainsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrainsController.prototype, "remove", null);
exports.TrainsController = TrainsController = __decorate([
    (0, common_1.Controller)('trains'),
    __metadata("design:paramtypes", [trains_service_1.TrainsService])
], TrainsController);
//# sourceMappingURL=trains.controller.js.map