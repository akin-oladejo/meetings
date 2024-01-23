import { IConfig } from "./interfaces/config.interface";

export function config(): IConfig {
    return {
        redisUrl: process.env.REDIS_URL,
        jwt: {
            secret: process.env.ACCESS_SECRET,
            time: parseInt(process.env.ACCESS_TIME, 10),
          },
    }
}

export { validationSchema } from "./validation.schema"