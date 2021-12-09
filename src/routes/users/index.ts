import checkAuth from "@/middlewares/checkAuth";
import { Context, DefaultState } from "koa";
import Router from "koa-router";
import {login, list, entry, new_create} from "@/routes/users/users.controller";

const router = new Router<DefaultState, Context>();

router.get("/users", checkAuth, list);

router.post("/login", checkAuth, login);

router.post("/entry", checkAuth, entry);

router.post("/create", checkAuth, new_create);

export default router;
