import checkAuth from "@/middlewares/checkAuth";
import { Context, DefaultState } from "koa";
import Router from "koa-router";
import { write_messages } from "@/routes/messages/message.controller";


const router = new Router<DefaultState, Context>();

router.post("/write_all", checkAuth, write_messages);

// router.post("/write", checkAuth, write_message);

export default router;