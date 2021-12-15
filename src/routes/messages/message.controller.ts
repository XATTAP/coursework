import { IKoaContext } from "@/interfaces";
import { messageFactory } from "@/routes/messages/message.service";
import { ServerValidationError } from "@/utils/errors";
import { transformAndValidate } from "class-transformer-validator";
import { IGeneralMessageDTO } from "./dto";

export const write_all = async (ctx: IKoaContext) => {
    const body: IGeneralMessageDTO = ctx.request.body;
    
    await transformAndValidate(IGeneralMessageDTO, body).catch(
      (err: ServerValidationError) => {
        throw new ServerValidationError(err.errorCode, err.message)
      }
    )
  
    const result = await messageFactory().write_all(body, ctx.user.id);
    ctx.body = result;
  };