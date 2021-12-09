import { IKoaContext } from "@/interfaces";
import { usersFactory } from "@/routes/users/users.service";
import { ServerValidationError } from "@/utils/errors";
import { transformAndValidate } from "class-transformer-validator";
import { ILoginDTO, IRegisterDTO, IUserDTO } from "./dto";

export const list = async (ctx: IKoaContext) => {
  const usersList = await usersFactory().getList();
  ctx.body = { ...usersList };
};

export const registration = async (ctx: IKoaContext) => {
  const body: IRegisterDTO = ctx.request.body;
  
  await transformAndValidate(IRegisterDTO, body).catch(
    (err: ServerValidationError) => {
      throw new ServerValidationError(err.errorCode, err.message)
    }
  )

  const result = await usersFactory().registration(body);
  ctx.body = result;
};

export const login = async (ctx: IKoaContext) => {
  const body: ILoginDTO = ctx.request.body;
  
  await transformAndValidate(ILoginDTO, body).catch(
    (err: ServerValidationError) => {
      throw new ServerValidationError(err.errorCode, err.message)
    }
  )

  const result = await usersFactory().login(body);
  ctx.body = result;
};

export const new_create = async (ctx: IKoaContext) => {
  const body: IUserDTO = ctx.request.body;
  
  await transformAndValidate(IUserDTO, body).catch(
    (err: ServerValidationError) => {
      throw new ServerValidationError(err.errorCode, err.message)
    }
  )

  const result = await usersFactory().new_create(body);
  ctx.body = result;
};
