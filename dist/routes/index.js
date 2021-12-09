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
const koa_router_1 = __importDefault(require("koa-router"));
const index_1 = __importDefault(require("@/routes/users/index"));
const index_2 = __importDefault(require("@/routes/messages/index"));
const router = new koa_router_1.default();
router.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.set("Pragma", "no-cache");
    ctx.set("Cache-Control", "no-cache, no-store");
    try {
        yield next();
    }
    catch (error) {
        throw error;
    }
}));
router.prefix("/");
router.get("/", (ctx) => {
    ctx.body = "Добро пожаловать в систему новостей";
});
router.use(index_1.default.routes(), index_2.default.routes());
if (process.env.CONSOLE_URL === "true") {
    console.log("available routes:");
    let i = 0;
    router.stack.forEach((r, index) => {
        if (r.methods && r.path.indexOf("[^/]") < 0) {
            console.log(`${(i += 1)}. ${r.methods} url = ${r.path} `);
        }
    });
    console.log("======");
}
exports.default = router;
