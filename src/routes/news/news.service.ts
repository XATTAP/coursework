import User from "@/db/models/User.model";
import { INewsDTO } from "./dto";
import moment from "moment";
import { Op } from 'sequelize';
import News from "@/db/models/News.model";

export class NewsService {

    async create_news(news: INewsDTO, id: number, scope = "" ) {
        const founded = await User.scope(scope).findByPk(id);
        if (!founded.isAdmin) {
            return {
                success: false,
                message: 'Недостаточно полномочий'
            }
        }

        const NEWS_LIMIT = 3;
        const NEWS_DELAY = 60;
        let where: any = {};

        where.createdAt = {
            [Op.gte]: moment()
                .subtract(NEWS_DELAY, "seconds")
                .format("YYYY-MM-DD HH:mm:ss")
        };

        const newsCount = await News.count({ where });

        if (newsCount >= NEWS_LIMIT) {
            return {
                success: false,
                message: `За ${NEWS_DELAY} секунд было обуликованно ${newsCount} новостей. Лимит ${NEWS_LIMIT}`
            };
        }

        const result = new News();
        result.Head = news.Head;
        result.info = news.info;
        
        await result.save();

        return {

            success: true,
            message: 'Новость опубликована',
            data: result
        }
    }

    async delete_news(self: User, id: number) {
        if (!self.isAdmin) {
          return {
            success: false,
            message: "недостаточно полномочий",
          };
        }

        const foundNews = await News.findByPk(id);
        if (!foundNews) {
          return {
            success: false,
            message: "новость не найдена",
          };
        }
    
        await News.destroy({ where: { id } });
    
        return {
          success: true,
          message: "новость удалена",
        };
      }
    


}
export const newsFactory = () => new NewsService();