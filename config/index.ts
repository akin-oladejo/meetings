import { IConfig } from "./interfaces/config.interface";

export function config(): IConfig {
    return {
        redisUrl: process.env.REDIS_URL
    }
}

export { validationSchema } from "./validation.schema"