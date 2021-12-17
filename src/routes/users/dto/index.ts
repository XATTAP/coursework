import {Length, IsDefined, IsEmail, IsOptional, isEmail} from "class-validator";

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

    date_of_dismissal: string;

    @IsDefined()
    salary: number;

    @IsDefined()
    marital_status: string;

    @IsDefined()
    amount_of_children: number;
}

export class IUserFullUpdateDTO {

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

    date_of_dismissal: string;

    @IsDefined()
    salary: number;

    @IsDefined()
    marital_status: string;

    @IsDefined()
    amount_of_children: number;

    @IsDefined()
    isAdmin: boolean;
}