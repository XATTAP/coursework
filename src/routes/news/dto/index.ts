import {IsDefined, IsEmail, Length} from "class-validator";

export class INewsDTO {

    @IsDefined()
    Head: string;

    @IsDefined()
    info: string;
}