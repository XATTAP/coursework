"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const checkAuth_1 = __importDefault(require("@/middlewares/checkAuth"));
const koa_router_1 = __importDefault(require("koa-router"));
const users_controller_1 = require("@/routes/users/users.controller");
const router = new koa_router_1.default();
router.get("/users", checkAuth_1.default, users_controller_1.list);
router.post("/login", checkAuth_1.default, users_controller_1.login);
router.post("/entry", checkAuth_1.default, users_controller_1.entry);
router.post("/create", checkAuth_1.default, users_controller_1.new_create);
exports.default = router;
