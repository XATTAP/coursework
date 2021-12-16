import User from "@/db/models/User.model";
import { ILoginDTO, IRegisterDTO, IUserDTO, IUserUpdateDTO } from "./dto";
import { genSaltSync, hashSync, compareSync } from "bcrypt";
import Message_General from "@/db/models/General_Message.model";
import Token from "@/db/models/Token.model";
import { sign } from "jsonwebtoken";

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
    const foundUser = await User.findOne({ where: { email: user.email} })

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

    await Message_General.destroy({ where: { userId } });
    await Token.destroy({ where: { userId } });
    foundUser.email = null;
    foundUser.password = null;

    return {
      success: true,
      message: "Профиль пользователя удален",
    };
  }
}
export const usersFactory = () => new UsersService();
