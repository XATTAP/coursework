import checkAuth from "@/middlewares/checkAuth";
import { Context, DefaultState } from "koa";
import Router from "koa-router";
import {registration, list, login, new_create, me_inform} from "@/routes/users/users.controller";
import nullcheckAuth from "@/middlewares/nullcheckAuth";

const router = new Router<DefaultState, Context>();

router.prefix("/users");

router.get("/", nullcheckAuth, list);

router.get("/me_inform", checkAuth, me_inform);

router.post("/create", checkAuth, new_create);

export default router;
