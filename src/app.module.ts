import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpacesModule } from './spaces/spaces.module';
import { PartiesModule } from './parties/parties.module';
import { HostsModule } from './hosts/hosts.module';
import { DrizzleModule } from './db/postgres/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis'
import * as redisStore from 'cache-manager-redis-store'
import { config, validationSchema } from 'config';
import { RedisModule} from './db/redis/redis.module';

@Module({
  imports: [
    SpacesModule,
    PartiesModule,
    HostsModule,
    DrizzleModule,
    ConfigModule.forRoot({
      isGlobal:true,
      load: [config],
      validationSchema 
    }),
    RedisModule,
    // CacheModule.register<RedisClientOptions>({
    //   isGlobal: true,
    //   store: redisStore,
    //   host: 'localhost',
    //   port: 6379
    // })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
