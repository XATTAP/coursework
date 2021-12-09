import "reflect-metadata";
import "@/aliases";
import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-body";
import routes from "@/routes";
import errorMiddleware from "@/middlewares/errorMiddleware";

const app = new Koa();

app.use(
  bodyParser({
    text: false,
    json: true,
    patchNode: true,
    patchKoa: true,
  })
);

app.use(cors());

app.use(errorMiddleware);

app.use(routes.routes());

export default app;
