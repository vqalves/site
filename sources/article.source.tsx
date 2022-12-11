import Article from "../models/article/article";
import LocaleType from "../models/locale/locale.type";

import { ParameterNullController20221119 } from "./articles/20221119.parameter.null.controller";
import { ChangeDotnetJsonConversion20221121 } from "./articles/20221121.change.dotnet.json.conversion";
import { DeserializeInterfaceWithJsonConverter20221203 } from "./articles/20221203.deserialize.interface.json.converter";
import { ZoningCoordinatesUsingKmlFiles20221203 } from "./articles/20221203.zoning.coordinates.using.kml.files";
import { AsyncParallelRabbitMQConsumption20221204 } from "./articles/20221204.async.parallel.rabbitmq.consumption";
import { RedisIntroduction20221211 } from "./articles/20221211.redis.introduction.and.example";

const articles: Article[] = [
    RedisIntroduction20221211,
    AsyncParallelRabbitMQConsumption20221204,
    ZoningCoordinatesUsingKmlFiles20221203,
    DeserializeInterfaceWithJsonConverter20221203,
    ChangeDotnetJsonConversion20221121,
    ParameterNullController20221119
];

const ArticleSource = {
    listAll(): Article[] { 
        return articles;
    },

    filter({ name, translator } : { name: string, translator: LocaleType }): Article[] {
        var resultList = this.listAll();

        if(name) {
            name = name.toLowerCase();

            resultList = resultList.filter((article) => {
                var title = translator.getContent(article.title).toLowerCase();
                return title.includes(name);
            });
        } 

        return resultList;
    },

    findByPermalink(permalink: string | string[] | undefined): Article | undefined {
        if(!permalink) return;

        var code = (permalink as string).split('-')[0];

        return this.listAll().find((article, index) => {
            return article.code === code;
        });
    }
}

export default ArticleSource;