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
exports.connect = exports.seeders = exports.migrations = exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = __importDefault(require("@/config"));
const umzug_1 = require("umzug");
exports.sequelize = new sequelize_typescript_1.Sequelize(process.env.USE_POSTGRES === "true"
    ? {
        dialect: "postgres",
        host: config_1.default.postgres.host,
        port: config_1.default.postgres.port,
        username: config_1.default.postgres.user,
        password: config_1.default.postgres.password,
        database: config_1.default.postgres.db,
        logging: config_1.default.logging,
        models: [__dirname + "/models/**.model.**"],
    }
    : {
        dialect: "sqlite",
        storage: config_1.default.sqlite.storage || "SQLite.db",
        logging: config_1.default.logging,
        models: [__dirname + "/models/**.model.**"],
    });
exports.migrations = new umzug_1.Umzug({
    migrations: {
        glob: ["migrations/*", { cwd: __dirname }],
    },
    context: exports.sequelize,
    storage: new umzug_1.SequelizeStorage({
        sequelize: exports.sequelize,
        modelName: "MigrationsMeta",
    }),
    logger: console,
});
exports.seeders = new umzug_1.Umzug({
    migrations: {
        glob: ["seeders/*", { cwd: __dirname }],
    },
    context: exports.sequelize,
    storage: new umzug_1.SequelizeStorage({
        sequelize: exports.sequelize,
        tableName: "SeedersMeta",
    }),
    logger: console,
});
const connect = (count = 0) => __awaiter(void 0, void 0, void 0, function* () {
    count += 1;
    exports.sequelize
        .authenticate()
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log("DB connected");
        if (process.env.FORCE_DB === "true") {
            yield exports.sequelize.sync({ force: true });
            yield exports.migrations.runAsCLI(["up"]);
            yield exports.seeders.runAsCLI(["up"]);
        }
    }))
        .catch((error) => {
        if (count <= 10) {
            setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, exports.connect)(count);
            }), 1000);
        }
        console.log("error connect db:", error.message);
    });
});
exports.connect = connect;
