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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageFactory = exports.MessageService = void 0;
const User_model_1 = __importDefault(require("@/db/models/User.model"));
const General_Message_model_1 = __importDefault(require("@/db/models/General_Message.model"));
const moment_1 = __importDefault(require("moment"));
const sequelize_1 = require("sequelize");
class MessageService {
    message_for_many(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const founded = yield User_model_1.default.findOne({ where: { email: message.email } });
            if (!founded) {
                return {
                    success: false,
                    message: 'Пользователь с данным email не найден'
                };
            }
            const MESSAGE_LIMIT = 3;
            const MESSAGE_DELAY = 30;
            let where = {};
            where.email = founded.email;
            where.createdAt = {
                [sequelize_1.Op.gte]: (0, moment_1.default)()
                    .subtract(MESSAGE_DELAY, "seconds")
                    .format("YYYY-MM-DD HH:mm:ss")
            };
            const messageCount = yield General_Message_model_1.default.count({ where });
            if (messageCount >= MESSAGE_LIMIT) {
                return {
                    success: false,
                    message: `За ${MESSAGE_DELAY} секунд отправлено ${messageCount} сообщений. Лимит ${MESSAGE_LIMIT}`
                };
            }
            var result = new General_Message_model_1.default();
            result.info = message.info;
            result.email = founded.email;
            yield result.save();
            return {
                success: true,
                message: 'Сообщение отправлено',
                data: result
            };
        });
    }
}
exports.MessageService = MessageService;
const messageFactory = () => new MessageService();
exports.messageFactory = messageFactory;
