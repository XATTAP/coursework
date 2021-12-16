import { Context, DefaultState } from "koa";
import Router from "koa-router";
import userRoutes from "@/routes/users/index";
import messageRoutes from "@/routes/messages/index";
import newsRoutes from "@/routes/news/index"
import { login, registration } from "./users/users.controller";

const router = new Router<DefaultState, Context>();

router.use(async (ctx, next) => {
  ctx.set("Pragma", "no-cache");
  ctx.set("Cache-Control", "no-cache, no-store");
  try {
    await next();
  } catch (error) {
    throw error;
  }
});

router.prefix("/");
router.get("/", (ctx: any) => {
  ctx.body = "Добро пожаловать в систему новостей";
});

router.post("/registration", registration.bind(this));
router.post("/login", login.bind(this));

router.use(userRoutes.routes(),
messageRoutes.routes(),
newsRoutes.routes());


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

export default router;
