import { IsDate, IsDefined, IsEmail} from "class-validator";

export class ItLoginDTO {

    @IsDefined()
    fio: string;

    @IsDefined()
    pasport: string;

    @IsEmail()
    @IsDefined()
    email: string;
  
    @IsDefined()
    password: string;
}

export class EntrynowDTO {

    @IsEmail()
    @IsDefined()
    email: string;
  
    @IsDefined()
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

export class ICreateUserDTO extends IUserDTO { }