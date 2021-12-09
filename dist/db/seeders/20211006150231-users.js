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
exports.down = exports.up = void 0;
const config_1 = __importDefault(require("@/config"));
const seedUsers = {
    development: [
        {
            fio: "Кузнецов Семен Валерьевич",
            birthday: "01.01.1929",
            male: "мужской",
            pasport: "97 20 859220",
            job: "директор",
            date_of_receipt: "02.01.1980",
            salary: 500000,
            marital_status: "Жен/ЗМ",
            amount_of_children: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            fio: "Константинов Валерий Михайлович",
            birthday: "12.11.1932",
            male: "мужской",
            pasport: "73 70 623633",
            job: "заместитель директора",
            date_of_receipt: "10.01.1980",
            salary: 250000,
            marital_status: "Разведен",
            amount_of_children: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            fio: "Васильева Ксения Тимофеевна",
            birthday: "25.09.1946",
            male: "женский",
            pasport: "86 33 478972",
            job: "менеджер по персоналу",
            date_of_receipt: "15.02.1980",
            salary: 80000,
            marital_status: "Жен/ЗМ",
            amount_of_children: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            fio: "Денисов Иван Даниилович",
            birthday: "16.08.1931",
            male: "мужской",
            pasport: "31 85 709240",
            job: "инженер",
            date_of_receipt: "16.04.1980",
            date_of_dismissal: "20.06.1980",
            salary: 50000,
            marital_status: "Жен/ЗМ",
            amount_of_children: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            fio: "Гусев Савелий Дмитриевич",
            birthday: "28.07.1934",
            male: "мужской",
            pasport: "34 98 393259",
            job: "электрослесарь",
            date_of_receipt: "16.04.1980",
            salary: 45000,
            marital_status: "Хол/НЗ",
            amount_of_children: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ],
};
const up = ({ context: sequelize }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!seedUsers[config_1.default.env].length)
        return;
    yield sequelize
        .getQueryInterface()
        .bulkInsert("Users", seedUsers[config_1.default.env]);
});
exports.up = up;
const down = ({ context: sequelize }) => __awaiter(void 0, void 0, void 0, function* () {
    yield sequelize.getQueryInterface().bulkDelete("Users", {
        uuid: seedUsers[config_1.default.env].map((u) => u.uuid),
    });
});
exports.down = down;
