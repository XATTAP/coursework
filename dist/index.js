"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("@/config"));
const server_1 = __importDefault(require("@/server"));
const sequelize_1 = require("@/db/sequelize");
server_1.default.listen(config_1.default.server.port, () => {
    console.log(`started on http://localhost:${config_1.default.server.port}`);
    (0, sequelize_1.connect)();
});
