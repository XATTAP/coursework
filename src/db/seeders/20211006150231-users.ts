import config from "@/config";
import User from "@/db/models/User.model";
import { DATEONLY } from "sequelize/types";

const seedUsers = {
  development: [
    {
      fio: "Кузнецов Семен Валерьевич",
      birthday: "01.01.1929",
      male: "мужской",
      pasport: "97 20 859220",
      job: "директор",
      date_of_receipt: "02.01.1980",
      salary: 500000,
      marital_status: "Жен/ЗМ",
      amount_of_children: 2,
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    {
      fio: "Константинов Валерий Михайлович",
      birthday: "12.11.1932",
      male: "мужской",
      pasport: "73 70 623633",
      job: "заместитель директора",
      date_of_receipt: "10.01.1980",
      salary: 250000,
      marital_status: "Разведен",
      amount_of_children: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    {
      fio: "Васильева Ксения Тимофеевна",
      birthday: "25.09.1946",
      male: "женский",
      pasport: "86 33 478972",
      job: "менеджер по персоналу",
      date_of_receipt: "15.02.1980",
      salary: 80000,
      marital_status: "Жен/ЗМ",
      amount_of_children: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    {
      fio: "Денисов Иван Даниилович",
      birthday: "16.08.1931",
      male: "мужской",
      pasport: "31 85 709240",
      job: "инженер",
      date_of_receipt: "16.04.1980",
      date_of_dismissal: "20.06.1980",
      salary: 50000,
      marital_status: "Жен/ЗМ",
      amount_of_children: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    {
      fio: "Гусев Савелий Дмитриевич",
      birthday: "28.07.1934",
      male: "мужской",
      pasport: "34 98 393259",
      job: "электрослесарь",
      date_of_receipt: "16.04.1980",
      salary: 45000,
      marital_status: "Хол/НЗ",
      amount_of_children: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ] as User[],
};

export const up = async ({ context: sequelize }) => {
  if (!seedUsers[config.env].length) return;
  await sequelize
    .getQueryInterface()
    .bulkInsert("Users", seedUsers[config.env]);
};

export const down = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete("Users", {
    uuid: seedUsers[config.env].map((u) => u.uuid),
  });
};
