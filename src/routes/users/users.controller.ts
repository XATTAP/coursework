import { IKoaContext } from "@/interfaces";
import { usersFactory } from "@/routes/users/users.service";
import { ServerValidationError } from "@/utils/errors";
import { transformAndValidate } from "class-transformer-validator";
import { EntrynowDTO, ItLoginDTO, IUserDTO } from "./dto";

export const list = async (ctx: IKoaContext) => {
  const usersList = await usersFactory().getList();
  ctx.body = { ...usersList };
};

export const login = async (ctx: IKoaContext) => {
  const body: ItLoginDTO = ctx.request.body;
  
  await transformAndValidate(ItLoginDTO, body).catch(
    (err: ServerValidationError) => {
      throw new ServerValidationError(err.errorCode, err.message)
    }
  )

  const result = await usersFactory().logined(body);
  ctx.body = result;
};

export const entry = async (ctx: IKoaContext) => {
  const body: EntrynowDTO = ctx.request.body;
  
  await transformAndValidate(EntrynowDTO, body).catch(
    (err: ServerValidationError) => {
      throw new ServerValidationError(err.errorCode, err.message)
    }
  )

  const result = await usersFactory().enter(body);
  ctx.body = result;
};

export const new_create = async (ctx: IKoaContext) => {
  const body: IUserDTO = ctx.request.body;
  
  await transformAndValidate(IUserDTO, body).catch(
    (err: ServerValidationError) => {
      throw new ServerValidationError(err.errorCode, err.message)
    }
  )

  const result = await usersFactory().new_created(body);
  ctx.body = result;
};
