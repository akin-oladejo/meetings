import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { REDIS_CLIENT } from "src/common/constants";
import { createClient } from "@redis/client";

@Module({
  providers: [
    {
      inject: [ConfigService],
      provide: REDIS_CLIENT,
      useFactory: async (configService: ConfigService) => {
        const client = createClient({ url: configService.get<string>('REDIS_URL') });
        await client.connect();
        return client;
      }
    }
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}