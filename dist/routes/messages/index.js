"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const checkAuth_1 = __importDefault(require("@/middlewares/checkAuth"));
const koa_router_1 = __importDefault(require("koa-router"));
const message_controller_1 = require("@/routes/messages/message.controller");
const router = new koa_router_1.default();
router.post("/write_all", checkAuth_1.default, message_controller_1.write_messages);
// router.post("/write", checkAuth, write_message);
exports.default = router;
