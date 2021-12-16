import {IsDefined, IsEmail, Length} from "class-validator";

export class INewsDTO {

    @IsDefined()
    @Length(5, 255, {})
    Head: string;

    @IsDefined()
    info: string;
}