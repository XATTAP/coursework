import {IsDefined, IsEmail, Length} from "class-validator";

export class IGeneralMessageDTO {

    @Length(5, 255, {})
    info: string;
}