import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpacesModule } from './spaces/spaces.module';
import { PartiesModule } from './parties/parties.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { config, validationSchema } from 'src/config';
import { RedisModule } from './redis/redis.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import * as joi from '@hapi/joi';

@Module({
  imports: [
    PartiesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      validationSchema: joi.object({
        NODE_ENV: joi.string().valid('development', 'production').default('development'),
        MONGO_URL: joi.string().required(),
        JWT_KEY: joi.string().required(),
      }),
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    SpacesModule,
    // RedisModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
