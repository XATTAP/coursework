import { IKoaContext } from "@/interfaces";
import { newsFactory } from "@/routes/news/news.service";
import { ServerValidationError } from "@/utils/errors";
import { transformAndValidate } from "class-transformer-validator";
import { INewsDTO } from "./dto";

export const list = async (ctx: IKoaContext) => {
  const newsList = await newsFactory().getList();
  ctx.body = { ...newsList };
};

export const create_news = async (ctx: IKoaContext) => {
    const body: INewsDTO = ctx.request.body;
    
    await transformAndValidate(INewsDTO, body).catch(
      (err: ServerValidationError) => {
        throw new ServerValidationError(err.errorCode, err.message)
      }
    )
  
    const result = await newsFactory().create_news(body, ctx.user.id);
    ctx.body = result;
  };

  export const delete_news = async (ctx: IKoaContext) => {
    const result = await newsFactory().delete_news(ctx.user, ctx.params.id);
    ctx.body = result;
  };