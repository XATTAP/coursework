import {IsDefined, IsEmail} from "class-validator";

export class IGeneralMessageDTO {

    @IsDefined()
    info: string;

    @IsEmail()
    @IsDefined()
    email: string;
}