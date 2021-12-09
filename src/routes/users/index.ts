import checkAuth from "@/middlewares/checkAuth";
import { Context, DefaultState } from "koa";
import Router from "koa-router";
import {registration, list, login, new_create} from "@/routes/users/users.controller";

const router = new Router<DefaultState, Context>();

router.get("/users", checkAuth, list);

router.post("/registration", checkAuth, registration);

router.post("/login", checkAuth, login);

router.post("/create", checkAuth, new_create);

export default router;
