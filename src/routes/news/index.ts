import checkAuth from "@/middlewares/checkAuth";
import { Context, DefaultState } from "koa";
import Router from "koa-router";
import {list, create_news, delete_news } from "./news.controller";

const router = new Router<DefaultState, Context>();

router.prefix("/news");

router.get("/", checkAuth, list);

router.post("/create", checkAuth, create_news);

router.delete("/delete/:id", checkAuth, delete_news);

export default router;