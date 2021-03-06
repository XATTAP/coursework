import User from "@/db/models/User.model";
import Message_General from "@/db/models/General_Message.model";
import { IsEmail } from "sequelize-typescript";
import { request } from "https";
import moment from "moment";
import { Op } from 'sequelize';
import { IGeneralMessageDTO } from "./dto";


export class MessageService {

    async write_all(message: IGeneralMessageDTO, id: number, scope = "" ) {
        const founded = await User.scope(scope).findByPk(id);
        if (!founded) {
            return {
                success: false,
                message: 'Пользователь с данным email не найден'
            }
        }

        const MESSAGE_LIMIT = 3;
        const MESSAGE_DELAY = 30;
        let where: any = {};

        where.userId = founded.id;
        where.createdAt = {
            [Op.gte]: moment()
                .subtract(MESSAGE_DELAY, "seconds")
                .format("YYYY-MM-DD HH:mm:ss")
        };

        const messageCount = await Message_General.count({ where });

        if (messageCount >= MESSAGE_LIMIT) {
            return {
                success: false,
                message: `За ${MESSAGE_DELAY} секунд отправлено ${messageCount} сообщений. Лимит ${MESSAGE_LIMIT}`
            };
        }

        const result = new Message_General();
        result.info = message.info;
        result.userId = founded.id;
        await result.save();

        return {

            success: true,
            message: 'Сообщение отправлено',
            data: result
        }
    }
}
export const messageFactory = () => new MessageService();