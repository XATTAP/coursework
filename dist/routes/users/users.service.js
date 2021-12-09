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
exports.usersFactory = exports.UsersService = void 0;
const User_model_1 = __importDefault(require("@/db/models/User.model"));
const General_Message_model_1 = __importDefault(require("@/db/models/General_Message.model"));
class UsersService {
    getList() {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUsers = yield User_model_1.default.findAll({
                include: [
                    { model: General_Message_model_1.default },
                ]
            });
            return { data: foundUsers };
        });
    }
    logined(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const founded = yield User_model_1.default.findOne({ where: { fio: user.fio, pasport: user.pasport } });
            // , birthday: user.birthday
            if (!founded) {
                return { success: false, message: 'Такого пользователя нет' };
            }
            if (founded.email || founded.password) {
                return { success: false, message: 'Пользователь уже зарегистрирован' };
            }
            // const USER_LIMIT = 2;
            // const USER_DELAY = 60;
            // let where: any = {};
            // where.createdAt = { 
            // [Op.gte] : moment()
            // .subtract(USER_DELAY, "seconds")
            // .format("YYYY-MM-DD HH:mm:ss")
            // };
            // const userCount = await User.count({ where });
            // if (userCount >= USER_LIMIT){
            // return{
            // success: false,
            // message: "За " + USER_DELAY + " секунд зарегистрировано " + userCount + " пользователей. (Лимит " + USER_LIMIT + ")"
            // };
            // }
            const result = founded;
            result.email = user.email;
            result.password = user.password;
            yield result.save();
            return {
                success: true,
                message: 'Успешная регистрация',
                data: result
            };
        });
    }
    enter(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const founded = yield User_model_1.default.findOne({ where: { email: user.email, password: user.password } });
            if (!founded) {
                return { success: false, message: 'Не удаётся войти' };
            }
            const result = founded;
            yield result.save();
            return {
                success: true,
                message: 'Добро пожаловать',
                data: result
            };
        });
    }
    new_created(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const founded = yield User_model_1.default.findOne({ where: { pasport: user.pasport } });
            if (founded) {
                return { success: false, message: 'Человек уже добавлен в БД' };
            }
            const result = new User_model_1.default();
            result.fio = user.fio;
            result.pasport = user.pasport;
            result.birthday = user.birthday;
            result.male = user.male;
            result.job = user.job;
            result.date_of_receipt = user.date_of_receipt;
            result.date_of_dismissal = user.date_of_dismissal;
            result.salary = user.salary;
            result.marital_status = user.marital_status;
            result.amount_of_children = user.amount_of_children;
            yield result.save();
            return {
                success: true,
                message: 'Человек успешно добавлен',
                data: result
            };
        });
    }
}
exports.UsersService = UsersService;
const usersFactory = () => new UsersService();
exports.usersFactory = usersFactory;
