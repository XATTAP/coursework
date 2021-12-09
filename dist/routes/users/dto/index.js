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
exports.ICreateUserDTO = exports.IUserDTO = exports.EntrynowDTO = exports.ItLoginDTO = void 0;
const class_validator_1 = require("class-validator");
class ItLoginDTO {
}
__decorate([
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], ItLoginDTO.prototype, "fio", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], ItLoginDTO.prototype, "pasport", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], ItLoginDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], ItLoginDTO.prototype, "password", void 0);
exports.ItLoginDTO = ItLoginDTO;
class EntrynowDTO {
}
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], EntrynowDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], EntrynowDTO.prototype, "password", void 0);
exports.EntrynowDTO = EntrynowDTO;
class IUserDTO {
}
__decorate([
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], IUserDTO.prototype, "fio", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], IUserDTO.prototype, "pasport", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], IUserDTO.prototype, "birthday", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], IUserDTO.prototype, "male", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], IUserDTO.prototype, "job", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], IUserDTO.prototype, "date_of_receipt", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", Number)
], IUserDTO.prototype, "salary", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], IUserDTO.prototype, "marital_status", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", Number)
], IUserDTO.prototype, "amount_of_children", void 0);
exports.IUserDTO = IUserDTO;
class ICreateUserDTO extends IUserDTO {
}
exports.ICreateUserDTO = ICreateUserDTO;
