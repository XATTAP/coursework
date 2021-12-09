import { IKoaContext } from "@/interfaces/index";
import { Next } from "koa";

export default async (ctx: IKoaContext, next: Next) => {
  return next();
};
