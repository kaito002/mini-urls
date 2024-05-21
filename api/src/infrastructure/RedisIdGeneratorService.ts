import Redis from "ioredis";
import {IdGeneratorService} from "../domain/services/IdGeneratorService";

export class RedisIdGeneratorService implements IdGeneratorService {

    private redis: Redis;

    constructor(redis: Redis) {
        this.redis = redis;
    }

    getNextId(): Promise<number> {
        return this.redis.incr("short:url:id")
    }
}
