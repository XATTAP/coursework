import { IKoaContext } from "@/interfaces";
import { usersFactory } from "@/routes/users/users.service";
import { ServerValidationError } from "@/utils/errors";
import { transformAndValidate } from "class-transformer-validator";
import { ILoginDTO, IRegisterDTO, IStatDTO, IUserDTO, IUserFullUpdateDTO, IUserUpdateDTO } from "./dto";

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

export const me_inform = async (ctx: IKoaContext) => {
  const result = await usersFactory().me_inform(ctx.user.id);
  ctx.body = result;
}

export const inform = async (ctx: IKoaContext) => {
  const result = await usersFactory().inform(ctx.params.id);
  ctx.body = result;
};

export const logout = async (ctx: IKoaContext) => {
  const result = await usersFactory().logout(ctx.user.id);
  ctx.body = result;
};

export const update_profil = async (ctx: IKoaContext) => {
  const body: IUserUpdateDTO = ctx.request.body;

  await transformAndValidate(IUserUpdateDTO, body).catch(
    (err: ServerValidationError) => {
      throw new ServerValidationError(err.errorCode, err.message);
    }
  );

  const result = await usersFactory().update_profil(ctx.user.id, body);
  ctx.body = result;
};

export const full_update_profil = async (ctx: IKoaContext) => {
  const body: IUserFullUpdateDTO = ctx.request.body;

  await transformAndValidate(IUserFullUpdateDTO, body).catch(
    (err: ServerValidationError) => {
      throw new ServerValidationError(err.errorCode, err.message)
    }
  )

  const result = await usersFactory().full_update_profil(ctx.user, ctx.params.id, body);
  ctx.body = result;
};

export const delete_profil = async (ctx: IKoaContext) => {
  const result = await usersFactory().delete_profil(ctx.user, ctx.params.id);
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

export const delete_person = async (ctx: IKoaContext) => {
  const result = await usersFactory().delete_person(ctx.user, ctx.params.id);
  ctx.body = result;
};

export const statistics = async (ctx: IKoaContext) => {
  const body: IStatDTO = ctx.request.body;

  await transformAndValidate(IStatDTO, body).catch(
    (err: ServerValidationError) => {
      throw new ServerValidationError(err.errorCode, err.message)
    }
  )

  const statisticsList = await usersFactory().getstatistics(body);
  ctx.body = { ...statisticsList };
};