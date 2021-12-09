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
exports.write_messages = void 0;
const message_service_1 = require("@/routes/messages/message.service");
const errors_1 = require("@/utils/errors");
const class_transformer_validator_1 = require("class-transformer-validator");
const dto_1 = require("./dto");
const write_messages = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const body = ctx.request.body;
    yield (0, class_transformer_validator_1.transformAndValidate)(dto_1.GeneralMessageDTO, body).catch((err) => {
        throw new errors_1.ServerValidationError(err.errorCode, err.message);
    });
    const result = yield (0, message_service_1.messageFactory)().message_for_many(body);
    ctx.body = result;
});
exports.write_messages = write_messages;
