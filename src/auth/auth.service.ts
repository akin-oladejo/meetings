import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from 'src/db/redis/redis.service';
import { userSchema } from './entities/user.entity';
import { IJwt } from 'config/interfaces/jwt.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly redisClient: RedisService,
        private readonly configService: ConfigService
    ) {
        // this.usersRepository = redisClient.fetchRepository(userSchema)
        // this.jwt = configService.get<IJwt>('jwt')
    }


}
