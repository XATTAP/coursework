import checkAuth from "@/middlewares/checkAuth";
import { Context, DefaultState } from "koa";
import Router from "koa-router";
import { write_all } from "@/routes/messages/message.controller";


const router = new Router<DefaultState, Context>();

router.post("/write_all", checkAuth, write_all);

// router.post("/write", checkAuth, write_message);

export default router;