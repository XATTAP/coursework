import User from "@/db/models/User.model";
import { ILoginDTO, IRegisterDTO, IStatDTO, IUserDTO, IUserFullUpdateDTO, IUserUpdateDTO } from "./dto";
import { genSaltSync, hashSync, compareSync } from "bcrypt";
import Message_General from "@/db/models/General_Message.model";
import Token from "@/db/models/Token.model";
import { sign } from "jsonwebtoken";
import { Op } from "sequelize";
import moment from "moment";

export class UsersService {

  async getList() {
    const foundUsers = await User.findAll({
      include: [
        { model: Message_General },
      ]
    });

    return { data: foundUsers };
  }

  generateJWT(owner: User): string {
    if (!owner) {
      throw new Error()
    }

    const accessToken = sign(owner.toJSON(), process.env.TOKEN_SECRET || "mySecretForGenerationJWT", { algorithm: "HS256" })

    return accessToken
  }

  async registration(user: IRegisterDTO) {
    const founded = await User.findOne({ where: { fio: user.fio, pasport: user.pasport } })
    if (!founded) {
      return { success: false, message: 'Такого пользователя не существует' }
    }

    if (founded.email) {
      return { success: false, message: 'Пользователь уже зарегистрирован' }
    }

    const result = founded;

    result.email = user.email;

    const salt = genSaltSync(10);
    result.password = hashSync(user.password, salt)

    const token = this.generateJWT(result);

    await Token.create({
      token,
      userId: result.id,
    });

    await result.save();

    return {
      success: true,
      message: 'Успешная регистрация',
      data: result,
      token
    }

  }
  async login(user: ILoginDTO) {
    const foundUser = await User.findOne({ where: { email: user.email } })

    if (!foundUser) {
      return { success: false, message: 'Неверно введен логин или пароль' }
    }

    await Token.destroy({ where: { userId: foundUser.id } });

    const correctPass = compareSync(user.password, foundUser.password);
    if (!correctPass) {
      return { success: false, message: 'Неверный пароль' }
    }

    const token = this.generateJWT(foundUser);

    await Token.create({
      token,
      userId: foundUser.id,
    });

    return {
      success: true,
      message: "Успешная аутентификация",
      user: foundUser,
      token
    }

  }

  async logout(userId: number) {
    await Token.destroy({ where: { userId } });

    return {
      success: true,
      message: "успешный выход из системы",
    };
  }

  async update_profil(id: number, body: IUserUpdateDTO) {
    const foundUser = await User.findByPk(id);

    if (!foundUser) {
      return { success: false, message: "пользователь не найден" };
    }

    if (body.password) {
      foundUser.password = hashSync(body.password, genSaltSync(10));
    }

    if (body.email) {
      foundUser.email = body.email;
    }

    await foundUser.save();

    return {
      success: true,
      message: "успешное редактирование профиля",
      user: foundUser,
    };
  }

  async full_update_profil(self: User, id: number, body: IUserFullUpdateDTO) {

    if (!self.isAdmin) {
      return {
        success: false,
        message: "недостаточно полномочий",
      };
    }

    const foundUser = await User.findByPk(id);

    if (!foundUser) {
      return { success: false, message: "пользователь не найден" };
    }

    if (body.fio) {
      foundUser.fio = body.fio;
    }
    if (body.pasport) {
      foundUser.pasport = body.pasport;
    }
    if (body.birthday) {
      foundUser.birthday = body.birthday;
    }
    if (body.male) {
      foundUser.male = body.male;
    }
    if (body.job) {
      foundUser.job = body.job;
    }
    if (body.date_of_receipt) {
      foundUser.date_of_receipt = body.date_of_receipt;
    }
    if (body.date_of_dismissal) {
      foundUser.date_of_dismissal = body.date_of_dismissal;
    }
    if (body.salary) {
      foundUser.salary = body.salary;
    }
    if (body.marital_status) {
      foundUser.marital_status = body.marital_status;
    }
    if (body.amount_of_children) {
      foundUser.amount_of_children = body.amount_of_children;
    }
    if (body.isAdmin) {
      foundUser.isAdmin = body.isAdmin;
    }

    await foundUser.save();

    return {
      success: true,
      message: "успешное редактирование профиля",
      user: foundUser,
    };
  }

  async new_create(user: IUserDTO) {
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
    result.isAdmin = user.isAdmin;

    await result.save();

    return {
      success: true,
      message: 'Сотрудник успешно добавлен',
      data: result
    }

  }

  async me_inform(id: number, scope = "") {
    const foundUser = await User.scope(scope).findByPk(id);

    if (!foundUser) {
      return {
        success: false,
        message: "пользователь не найден",
      };
    }

    return foundUser;
  }

  async inform(id: number, scope = "") {
    const foundUser = await User.scope(scope).findByPk(id);

    if (!foundUser) {
      return {
        success: false,
        message: "пользователь не найден",
      };
    }

    return foundUser;
  }

  async delete_person(self: User, userId: number) {
    if (!self.isAdmin) {
      return {
        success: false,
        message: "недостаточно полномочий",
      };
    }

    const foundUser = await User.findByPk(userId);
    if (!foundUser) {
      return {
        success: false,
        message: "пользователь не найден",
      };
    }

    if (foundUser.isAdmin) {
      return {
        success: false,
        message: "удаление администратора запрещено",
      };
    }

    await Message_General.destroy({ where: { userId } });
    await Token.destroy({ where: { userId } });
    await User.destroy({ where: { id: userId } });

    return {
      success: true,
      message: "пользователь удален",
    };
  }

  async delete_profil(self: User, userId: number) {
    if (self.id != userId) {


      if (!self.isAdmin) {
        return {
          success: false,
          message: "недостаточно полномочий",
        };
      }

      const foundUser = await User.findByPk(userId);

      if (!foundUser) {
        return {
          success: false,
          message: "пользователь не найден",
        };
      }

      if (!foundUser.email) {
        return {
          success: false,
          message: "Этот пользователь не имеет учетной записи",
        };
      }

      if (foundUser.isAdmin && (foundUser.id != self.id)) {
        return {
          success: false,
          message: "удаление администратора запрещено",
        };
      }
    }
    const foundUser = await User.findByPk(userId);

    await Message_General.destroy({ where: { userId } });
    await Token.destroy({ where: { userId } });
    foundUser.email = null;
    foundUser.password = null;

    await foundUser.save();

    return {
      success: true,
      message: "Профиль пользователя удален"
    };
  }

  async getstatistics(body: IStatDTO) {
    let male_count: {
      m: number
      g: number
    }={m:0, g:0},
      salary_count: {
        less_20: number
        c20_40: number
        c40_60: number
        c60_80: number
        c80_100: number
        more_100: number
      } = { less_20: 0, c20_40: 0, c40_60: 0, c60_80: 0, c80_100: 0, more_100: 0},
      amount_of_children_count:{
        zero: number
        one: number
        two: number
        three: number
        more_three: number
      } = { zero: 0, one: 0, two: 0, three: 0, more_three: 0}

    const foundUsers = await User.findAll({
      where: {
        date_of_dismissal: {
          [Op.ne]: null
        }
      }
    });

      for (let index = 0; index < foundUsers.length; index++) {
        switch (foundUsers[index].amount_of_children) {
          case 0: amount_of_children_count.zero++
            break;
          case 1: amount_of_children_count.one++
            break;
          case 2: amount_of_children_count.two++
            break;
          case 3: amount_of_children_count.three++
            break;
          default: amount_of_children_count.more_three++
            break;
        }
      }
      for (let index = 0; index < foundUsers.length; index++) {
        if (foundUsers[index].salary < 20000) {
          salary_count.less_20++
        }
        if ((foundUsers[index].salary >= 20000) && (foundUsers[index].salary < 40000)) {
          salary_count.c20_40++
        }
        if ((foundUsers[index].salary >= 40000) && (foundUsers[index].salary < 60000)) {
          salary_count.c40_60++
        }
        if ((foundUsers[index].salary >= 60000) && (foundUsers[index].salary < 80000)) {
          salary_count.c60_80++
        }
        if ((foundUsers[index].salary >= 80000) && (foundUsers[index].salary < 100000)) {
          salary_count.c80_100++
        }
        if (foundUsers[index].salary > 100000) {
          salary_count.more_100++
        }
      }
      for (let index = 0; index < foundUsers.length; index++) {
        switch (foundUsers[index].male) {
          case "мужской": male_count.m++           
            break;
          case "женский": male_count.g++           
            break;
        }
      }

    return { data: [male_count, salary_count, amount_of_children_count] };
    // const foundUser = await User.findOne({where: {id:4}});
    // console.log(foundUser)
    // const mom = moment(foundUser.date_of_dismissal)
    // return { data: [foundUser.id, foundUser.fio, foundUser.date_of_dismissal, mom]};
  }

}
export const usersFactory = () => new UsersService();
