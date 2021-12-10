import User from "@/db/models/User.model";
import { Context } from "koa";

export interface IKoaContext extends Context {
  user: User;
  params: any;
}

export interface IUserContext {
  id: number;
  email: string;
}