import { IKoaContext } from "@/interfaces";
import { messageFactory } from "@/routes/messages/message.service";
import { ServerValidationError } from "@/utils/errors";
import { transformAndValidate } from "class-transformer-validator";
import { GeneralMessageDTO } from "./dto";

export const write_messages = async (ctx: IKoaContext) => {
    const body: GeneralMessageDTO = ctx.request.body;
    
    await transformAndValidate(GeneralMessageDTO, body).catch(
      (err: ServerValidationError) => {
        throw new ServerValidationError(err.errorCode, err.message)
      }
    )
  
    const result = await messageFactory().message_for_many(body);
    ctx.body = result;
  };