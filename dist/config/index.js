"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env = process.env.NODE_ENV || "development";
const port = process.env.SERVER_PORT || 4100;
const config = {
    env,
    server: {
        protocol: env !== "development" ? "https://" : "http://",
        host: process.env.SERVER_HOST || `http://localhost:${port}`,
        port,
    },
    postgres: {
        host: process.env.PG_HOST || "localhost",
        port: Number(process.env.PG_PORT) || 5432,
        user: process.env.PG_USER || "postgres",
        password: process.env.PG_PASSWORD || "postgres",
        db: process.env.PG_DATABASE || "myDB",
    },
    sqlite: {
        storage: process.env.SQLITE_FILENAME || "defaultSQLite.db",
        logging: process.env.SEQUELIZE_LOG === "true",
    },
    logging: process.env.SEQUELIZE_LOG === "true",
};
exports.default = config;
