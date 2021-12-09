import {IsDefined, IsEmail} from "class-validator";

export class GeneralMessageDTO {

    @IsDefined()
    info: string;

    @IsEmail()
    @IsDefined()
    email: string;
}