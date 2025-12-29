"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTrainDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_train_dto_1 = require("./create-train.dto");
class UpdateTrainDto extends (0, mapped_types_1.PartialType)(create_train_dto_1.CreateTrainDto) {
}
exports.UpdateTrainDto = UpdateTrainDto;
//# sourceMappingURL=update-train.dto.js.map