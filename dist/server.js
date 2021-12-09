"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("@/aliases");
const koa_1 = __importDefault(require("koa"));
const cors_1 = __importDefault(require("@koa/cors"));
const koa_body_1 = __importDefault(require("koa-body"));
const routes_1 = __importDefault(require("@/routes"));
const errorMiddleware_1 = __importDefault(require("@/middlewares/errorMiddleware"));
const app = new koa_1.default();
app.use((0, koa_body_1.default)({
    text: false,
    json: true,
    patchNode: true,
    patchKoa: true,
}));
app.use((0, cors_1.default)());
app.use(errorMiddleware_1.default);
app.use(routes_1.default.routes());
exports.default = app;
