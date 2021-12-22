import {Length, IsDefined, IsEmail, IsOptional, isEmail, IsNumber} from "class-validator";
import { isNumber } from "lodash";

export class IRegisterDTO {

    @IsDefined()
    fio: string;

    @IsDefined()
    pasport: string;

    @IsEmail()
    @IsDefined()
    email: string;
  
    @IsDefined()
    @Length(6,20,{})
    password: string;
}

export class IUserUpdateDTO {
    
    @IsEmail()
    @IsOptional()
    email: string;
  
    @IsOptional()
    @Length(6, 20, {})
    password: string;
  }

export class ILoginDTO {

    @IsEmail()
    @IsDefined()
    email: string;
  
    @IsDefined()
    @Length(6,20,{})
    password: string;
}

export class IUserDTO {

    @IsDefined()
    fio: string;

    @IsDefined()
    pasport: string;

    @IsDefined()
    birthday: string;
  
    @IsDefined()
    male: string;

    @IsDefined()
    job: string;

    @IsDefined()
    date_of_receipt: string;

    date_of_dismissal: Date;

    @IsDefined()
    salary: number;

    @IsDefined()
    marital_status: string;

    @IsDefined()
    amount_of_children: number;

    isAdmin: boolean;
}

export class IStateDTO {

    @IsDefined()
    time: string;
}