import checkAuth from "@/middlewares/checkAuth";
import { Context, DefaultState } from "koa";
import Router from "koa-router";
import {registration, list, login, new_create} from "@/routes/users/users.controller";
import nullcheckAuth from "@/middlewares/nullcheckAuth";

const router = new Router<DefaultState, Context>();

router.prefix("/users");

router.get("/", nullcheckAuth, list);

router.post("/create", checkAuth, new_create);

export default router;
