"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.new_create = exports.entry = exports.login = exports.list = void 0;
const users_service_1 = require("@/routes/users/users.service");
const errors_1 = require("@/utils/errors");
const class_transformer_validator_1 = require("class-transformer-validator");
const dto_1 = require("./dto");
const list = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const usersList = yield (0, users_service_1.usersFactory)().getList();
    ctx.body = Object.assign({}, usersList);
});
exports.list = list;
const login = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const body = ctx.request.body;
    yield (0, class_transformer_validator_1.transformAndValidate)(dto_1.ItLoginDTO, body).catch((err) => {
        throw new errors_1.ServerValidationError(err.errorCode, err.message);
    });
    const result = yield (0, users_service_1.usersFactory)().logined(body);
    ctx.body = result;
});
exports.login = login;
const entry = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const body = ctx.request.body;
    yield (0, class_transformer_validator_1.transformAndValidate)(dto_1.EntrynowDTO, body).catch((err) => {
        throw new errors_1.ServerValidationError(err.errorCode, err.message);
    });
    const result = yield (0, users_service_1.usersFactory)().enter(body);
    ctx.body = result;
});
exports.entry = entry;
const new_create = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const body = ctx.request.body;
    yield (0, class_transformer_validator_1.transformAndValidate)(dto_1.IUserDTO, body).catch((err) => {
        throw new errors_1.ServerValidationError(err.errorCode, err.message);
    });
    const result = yield (0, users_service_1.usersFactory)().new_created(body);
    ctx.body = result;
});
exports.new_create = new_create;
