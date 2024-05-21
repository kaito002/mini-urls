import {IdGeneratorService} from "../domain/services/IdGeneratorService";
import {RedisIdGeneratorService} from "../infrastructure/RedisIdGeneratorService";
import Redis from "ioredis";
import {Base62Converter} from "../infrastructure/Base62Converter";

export class ServicesProvider {
    static _idGeneratorService: IdGeneratorService | null = null;
    static _base62Converter: Base62Converter | null = null;

    static idGeneratorService(): IdGeneratorService {
        if (ServicesProvider._idGeneratorService === null) {
            ServicesProvider._idGeneratorService = new RedisIdGeneratorService(new Redis({
                port: parseInt(process.env.REDIS_PORT!),
                host: process.env.REDIS_HOST,
            }))
        }

        return ServicesProvider._idGeneratorService!;
    }

    static base62Converter(): Base62Converter {
        if (ServicesProvider._base62Converter === null) {
            ServicesProvider._base62Converter = new Base62Converter();
        }

        return ServicesProvider._base62Converter!;
    }
}
