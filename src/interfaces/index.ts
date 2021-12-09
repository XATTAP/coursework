import { Context } from "koa";

export interface IKoaContext extends Context {
  user: IUserContext;
  params: any;
}

export interface IUserContext {
  id: number;
  email: string;
}