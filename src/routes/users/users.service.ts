import User from "@/db/models/User.model";
import { EntrynowDTO, ItLoginDTO, IUserDTO } from "./dto";
import { IsEmail } from "sequelize-typescript";
import { request } from "https";
import moment from "moment";
import { Op } from 'sequelize';
import Message_General from "@/db/models/General_Message.model";

export class UsersService {

  async getList() {
    const foundUsers = await User.findAll({
      include: [
        { model: Message_General },
      ]
    });

    return { data: foundUsers };
  }

  async logined(user: ItLoginDTO) {
    const founded = await User.findOne({ where: { fio: user.fio, pasport: user.pasport } })
    // , birthday: user.birthday
    if (!founded) {
      return { success: false, message: 'Такого пользователя нет' }
    }

    if (founded.email || founded.password) {
      return { success: false, message: 'Пользователь уже зарегистрирован' }
    }

    // const USER_LIMIT = 2;
    // const USER_DELAY = 60;
    // let where: any = {};


    // where.createdAt = { 
    // [Op.gte] : moment()
    // .subtract(USER_DELAY, "seconds")
    // .format("YYYY-MM-DD HH:mm:ss")
    // };

    // const userCount = await User.count({ where });

    // if (userCount >= USER_LIMIT){
    // return{
    // success: false,
    // message: "За " + USER_DELAY + " секунд зарегистрировано " + userCount + " пользователей. (Лимит " + USER_LIMIT + ")"
    // };
    // }

    const result = founded;

    result.email = user.email;
    result.password = user.password;

    await result.save();

    return {
      success: true,
      message: 'Успешная регистрация',
      data: result
    }

  }
  async enter(user: EntrynowDTO) {
    const founded = await User.findOne({ where: { email: user.email, password: user.password } })

    if (!founded) {
      return { success: false, message: 'Не удаётся войти' }
    }

    const result = founded;

    await result.save();

    return {
      success: true,
      message: 'Добро пожаловать',
      data: result
    }

  }

  async new_created(user: IUserDTO) {
    const founded = await User.findOne({ where: { pasport: user.pasport } })

    if (founded) {
      return { success: false, message: 'Человек уже добавлен в БД' }
    }

    const result = new User();

    result.fio = user.fio;
    result.pasport = user.pasport;
    result.birthday = user.birthday;
    result.male = user.male;
    result.job = user.job;
    result.date_of_receipt = user.date_of_receipt;
    result.date_of_dismissal = user.date_of_dismissal;
    result.salary = user.salary;
    result.marital_status = user.marital_status;
    result.amount_of_children = user.amount_of_children;

    await result.save();

    return {
      success: true,
      message: 'Человек успешно добавлен',
      data: result
    }

  }
}
export const usersFactory = () => new UsersService();
