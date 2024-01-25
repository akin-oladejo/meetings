import { IJwt } from "./jwt.interface"

export interface IConfig {
    redisUrl: string
    jwt: IJwt
    mongoUrl:string
}